import { IletisimDialogComponent } from './../dialogs/iletisim-dialog/iletisim-dialog.component';
import { Iletisim } from './../../models/Iletisim';
import { TedarikDialogComponent } from './../dialogs/tedarik-dialog/tedarik-dialog.component';
import { Urunler } from './../../models/Urunler';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Uye } from './../../models/Uye';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-urunListe',
  templateUrl: './urunListe.component.html',
  styleUrls: ['./urunListe.component.css']
})
export class UrunListeComponent implements OnInit {
  kayitlar: Urunler[];
  uyeId: string;
  urunler: Urunler[];
  secUye: Uye;
  secUrun:Urunler;

  secIletisim:Iletisim;
  dataSource: any;
  displayedColumns = ['UrunFoto','Adi', 'Aciklama','Fiyat','Aktiflik', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<TedarikDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  dialogIletisimRef: MatDialogRef<IletisimDialogComponent>
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  
  ) { }

  ngOnInit() {
    this.UrunListele();
    this.route.params.subscribe(p => {
      if (p) {
        this.uyeId = p.uyeId;
        this.UyeGetir();
        this.KayitListele();
        this.IletisimGetir();
      }
    })
  }

  UyeGetir() {
    this.apiServis.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;
    })
  }

  IletisimGetir() {
    this.apiServis.IletisimById(this.uyeId).subscribe((d: Iletisim) => {
      this.secIletisim = d;
    })
  }

  //tedarik
  KayitListele() {
      this.apiServis.TedarikUrunListe(this.uyeId).subscribe((d: Urunler[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urunler[]) => {
      this.urunler = d;
    });
  }

  Duzenle(kayit: Urunler) {
    this.dialogRef = this.matDialog.open(TedarikDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.Aktiflik = d.Aktiflik
        kayit.Adi = d.Adi
        kayit.Aciklama = d.Aciklama
        kayit.Fiyat = d.Fiyat
        this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });

  }


  IletisimEkle(secUye:string) {
    var secIletisim: Iletisim = new Iletisim();
    
    this.dialogIletisimRef = this.matDialog.open(IletisimDialogComponent, {
      width: '400px',
      data: {
        secIletisim: secIletisim,
        islem: "ekle",
        secUye:secUye
      }
    });
    this.dialogIletisimRef.afterClosed().subscribe(d => {
    
     
      if (d) {
        this.apiServis.IletisimEkle(d).subscribe((s: Sonuc) => {
  
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.IletisimGetir();
          }
        });
      }
    });

  }


  iletisimDuzenle(secIletisim: Iletisim) {
   
    this.dialogIletisimRef = this.matDialog.open(IletisimDialogComponent, {
      width: '400px',
      data: {
        secIletisim: secIletisim,
        islem: "duzenle"
      }
    });
    
    this.dialogIletisimRef.afterClosed().subscribe(d => {
      
      if (d) {

        secIletisim.Ad = d.Ad
        secIletisim.Adres = d.Adres
        secIletisim.Soyad = d.Soyad
        secIletisim.Telefon = d.Telefon
        secIletisim.UyeId = d.UyeId

          this.apiServis.IletisimDuzenle(secIletisim).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.IletisimGetir();
          }
        });
      }
    });

  }


  iletisimSil(kayit: Iletisim) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.Ad +" "+ kayit.Soyad + " Adlı Kişinin İletişim Bilgileri Silinecektir Onaylıyor Musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.IletisimSil(kayit.iletisimId).subscribe((s: Sonuc) => {
          console.log(s);
          this.IletisimGetir();
        });
      }
    });
  }

  UrunSil(kayit: Urunler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.Adi + " Ürün Silinecektir Onaylıyor Musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UrunSil(kayit.urunId).subscribe((s: Sonuc) => {
          console.log(s);
          this.KayitListele();
        });
      }
    });
  }
  


}
