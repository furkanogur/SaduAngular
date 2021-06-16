import { Siparis } from 'src/app/models/siparis';
import { Sonuc } from 'src/app/models/Sonuc';
import { UyeFoto } from './../../models/UyeFoto';
import { FotoyukleDialogComponent } from './../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { Iletisim } from 'src/app/models/Iletisim';

@Component({
  selector: 'app-Uye',
  templateUrl: './Uye.component.html',
  styleUrls: ['./Uye.component.scss']
})
export class UyeComponent implements OnInit {
  uyeId: string;
  siparisId: string;
  uyeler: Uye[];
  secIletisim: Iletisim;
  secSiparis: Siparis;
  dialogRef: MatDialogRef<UyeDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  fotoDialogRef: MatDialogRef<FotoyukleDialogComponent>
  dataSource: any;
  displayedColumns = ['UyeFoto', 'KullaniciAdi', 'Sifre', 'Email', 'UyeUrunSayisi', 'admin', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UyeListele();
    this.SiparisGetir();
    this.SiparisListele();
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  IletisimGetir() {
    this.apiServis.IletisimById(this.uyeId).subscribe((d: Iletisim) => {
      this.secIletisim = d;
    })
  }

  UyeFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  Ekle() {
    var yeniKayit: Uye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "ekle",
        hesabim:true
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.UyeFoto = "profil.jpg"
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });

  }

  Duzenle(kayit: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "duzenle",
        hesabim: true
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.KullaniciAdi = d.KullaniciAdi
        kayit.Sifre = d.Sifre
        kayit.admin = d.admin

        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });

  }
  SiparisGetir() {
    this.apiServis.SiparisalanUById(this.uyeId).subscribe((d: Siparis) => {
      this.secSiparis = d;
    })
  }
  SiparisListele() {
    this.apiServis.SiparisListe().subscribe((d: Siparis) => {
      this.secSiparis = d;
    })
  }

  Sil(kayit: Uye) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',

    })
    this.apiServis.SiparisVerenById(kayit.uyeId).subscribe((d: Siparis) => {
      this.secSiparis = d;
      this.siparisId = d.siparisId;
      this.confirmDialogRef.componentInstance.dialogMesaj = kayit.Email + "  - Emaili de belirtilen üye silinecektir Onaylıyor musunuz?"
      this.confirmDialogRef.afterClosed().subscribe(d => {
        if (d) {
          this.apiServis.SiparisSil(this.siparisId).subscribe((s: Sonuc) => {
            console.log(s);
            console.log(this.siparisId);
            this.alert.AlertUygula(s);
            this.apiServis.UyeSil(kayit.uyeId).subscribe((s: Sonuc) => {
              this.alert.AlertUygula(s);
              this.UyeListele();
            });
          });
        }
      })
    })
  }


  FotoGuncelle(kayit: Uye) {
    this.fotoDialogRef = this.matDialog.open(FotoyukleDialogComponent, {
      width: '400',
      data: kayit
    });
    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.uyeId = kayit.uyeId;
        this.apiServis.UyeFotoGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        })
      }
    })
  }



}
