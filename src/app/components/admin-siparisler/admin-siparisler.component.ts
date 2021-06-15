import { Kargo } from './../../models/Kargo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Siparis } from 'src/app/models/siparis';
import { Urunler } from 'src/app/models/Urunler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { SiparisduzenleDialogComponent } from '../dialogs/siparisduzenle-dialog/siparisduzenle-dialog.component';
import { SiparisDurum } from 'src/app/models/SiparisDurum';
import { Sonuc } from 'src/app/models/Sonuc';
import { Iletisim } from 'src/app/models/Iletisim';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-siparisler',
  templateUrl: './admin-siparisler.component.html',
  styleUrls: ['./admin-siparisler.component.css']
})
export class AdminSiparislerComponent implements OnInit {
  GonderilecekdisplayedColumns = ['SiparisUrun', 'SiparisUrun2', 'SiparisUye0', 'SiparisUrun3', 'Fiyat', 'SiparisDurum', 'SiparisUye', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogSiparisDuzenleRef: MatDialogRef<SiparisduzenleDialogComponent>
  UyeId: string;
  GonderilecekdataSource: any;
  kayitlar: Urunler[];
  tedarikuyeid: string;
  kargo: Kargo[];
  secUrun: Urunler;
  siparisDurum: SiparisDurum[];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  secIletisim: Iletisim;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,) { }

  ngOnInit() {
    this.SiparisListele();
    this.IletisimGetir();
  }

  SiparisListele() {
    this.apiServis.SiparisListe().subscribe((d: Urunler[]) => {
      this.kayitlar = d;
      console.log(d);
      this.GonderilecekdataSource = new MatTableDataSource(d);
      this.GonderilecekdataSource.sort = this.sort
      this.GonderilecekdataSource.paginator = this.paginator
      console.log(this.GonderilecekdataSource)
      this.apiServis.SiparisDurumListe().subscribe((d: SiparisDurum[]) => {
        this.siparisDurum = d
      })
      this.apiServis.IletisimById(this.kayitlar[2].UyeId).subscribe((d: Iletisim) => {
        this.secIletisim = d;
        console.log(this.secIletisim)
        console.log(d)
      })
      
      this.apiServis.KargoListe().subscribe((d: Kargo[]) => {
        this.kargo = d
      })
    })
  }

  SiparisFiltrele(e) {
    var deger = e.target.value;
    this.GonderilecekdataSource.filter = deger.trim().toLowerCase();
    if (this.GonderilecekdataSource.paginator) {
      this.GonderilecekdataSource.paginator.firstPage();
    }
  }

  SiparisDuzenle(kayit: Siparis) {


    this.apiServis.SiparisDurumListe().subscribe((d: SiparisDurum[]) => {
      this.siparisDurum = d
    })

    this.apiServis.KargoListe().subscribe((d: Kargo[]) => {
      this.kargo = d
    })

    this.dialogSiparisDuzenleRef = this.matDialog.open(SiparisduzenleDialogComponent, {
      width: '400px',
      data: {
        secSiparis: kayit,
        islem: "duzenle",
        secUrun: this.secUrun,
        secSiparisDurum: this.siparisDurum,
        secKargo: this.kargo,

      }
    });

    this.dialogSiparisDuzenleRef.afterClosed().subscribe(d => {

      if (d) {
        kayit.KargoId = d.KargoId
        kayit.KargoUcreti = d.KargoUcreti
        kayit.SiparisDurumuId = d.SiparisDurumuId
        console.log(d.UrunId)
        console.log(d)
        this.apiServis.SiparisDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {

            this.SiparisListele()
          }
        });
      }
    });

  }

  IletisimGetir() {
    this.apiServis.IletisimById(this.UyeId).subscribe((d: Iletisim) => {
      this.secIletisim = d;
    })
  }

  SiparisSil(kayit: Siparis) {

    this.apiServis.IletisimById(kayit.UyeId).subscribe((d: Iletisim) => {
      this.secIletisim = d;
    })
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.SiparisUrun.Adi + " Adlı Ürün " + this.secIletisim.Ad + " " + this.secIletisim.Soyad + " Adlı Kişiye Teslim Edildiyse Sipariş Silinecektir Onaylıyormusunuz??";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SiparisSil(kayit.siparisId).subscribe((s: Sonuc) => {
          this.SiparisListele()
        });
      }
    });
  }

}
