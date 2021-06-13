import { UyeDialogComponent } from './../dialogs/uye-dialog/uye-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Iletisim } from 'src/app/models/Iletisim';
import { Sonuc } from 'src/app/models/Sonuc';
import { Urunler } from 'src/app/models/Urunler';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { IletisimDialogComponent } from '../dialogs/iletisim-dialog/iletisim-dialog.component';
import { TedarikDialogComponent } from '../dialogs/tedarik-dialog/tedarik-dialog.component';
import { UrunDialogComponent } from '../dialogs/urun-dialog/urun-dialog.component';
import { UrunfotoDialogComponent } from '../dialogs/urunfoto-dialog/urunfoto-dialog.component';
import { FotoyukleDialogComponent } from '../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { Kategoriler } from 'src/app/models/Kategori';

@Component({
  selector: 'app-hesabim',
  templateUrl: './hesabim.component.html',
  styleUrls: ['./hesabim.component.scss']
})
export class HesabimComponent implements OnInit {
  kayitlar: Urunler[];
  UyeId: string = localStorage.getItem("uyeId");
  UrunId:string;
  urunler: Urunler[];
  kategoriler: Kategoriler[];
  secUye: Uye;
  secUrun: Urunler;

  secIletisim: Iletisim;
  dataSource: any;
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'Aktiflik', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<TedarikDialogComponent>
  urunDialogRef: MatDialogRef<UrunDialogComponent>
  uyeDialogRef: MatDialogRef<UyeDialogComponent>
  fotoDialogRef: MatDialogRef<UrunfotoDialogComponent>;
  uyeFotoDialogRef: MatDialogRef<FotoyukleDialogComponent>;
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
        this.UyeGetir();
        this.KayitListele();
        this.IletisimGetir();
        this.KategoriListele();
      }
    })
  }

  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  UyeGetir() {
    this.apiServis.UyeById(this.UyeId).subscribe((d: Uye) => {
      this.secUye = d;
    })
  }

  IletisimGetir() {
    this.apiServis.IletisimById(this.UyeId).subscribe((d: Iletisim) => {
      this.secIletisim = d;
    })
  }

  //tedarik spesifik üyenin ürünleri
  KayitListele() {
    this.apiServis.TedarikUrunListe(this.UyeId).subscribe((d: Urunler[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }
  // tüm ürünler
  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urunler[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  FotoGuncelle(kayit: Urunler,) {
    this.fotoDialogRef = this.matDialog.open(UrunfotoDialogComponent, {
      width: '400',
      data: kayit
    });
    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.urunId = kayit.urunId;
        this.apiServis.UrunFotoGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        })
      }
    })
  }

  UyeFotoGuncelle(kayit: Uye) {
    this.uyeFotoDialogRef = this.matDialog.open(FotoyukleDialogComponent, {
      width: '400',
      data: kayit
    });
    this.uyeFotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.uyeId = kayit.uyeId;
        this.apiServis.UyeFotoGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        })
      }
    })
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
            this.KayitListele();
          }
        });
      }
    });

  }




  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d:any= Kategoriler) => {
      this.kategoriler = d;
    })
  }


  UyeUrunEkle() {
    this.apiServis.KategoriListe().subscribe((d: any = Kategoriler) => {
      this.kategoriler = d;
    })
    var yeniKayit: Urunler = new Urunler();
    var yeniKatKayit: Kategoriler = new Kategoriler();
    this.urunDialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "ekle",
        katbilgi: this.kategoriler,
        yeniKatKayit: yeniKatKayit
      }
    });
    console.log(yeniKatKayit)
    this.urunDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.UrunFoto = "urun.jpg"
        d.UyeId = this.UyeId
        console.log(d)
        //kat id almayı başardık
        this.apiServis.UrunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
            d.UrunId=s.id
            console.log(d.UrunId)
            this.apiServis.KategoriUrunEkle(d).subscribe((s: Sonuc) => {
              this.alert.AlertUygula(s);
              if (s.islem) {
              }
            });
          }
        });
        


      }
    });
  }


  IletisimEkle(secUye: string) {
    var secIletisim: Iletisim = new Iletisim();

    this.dialogIletisimRef = this.matDialog.open(IletisimDialogComponent, {
      width: '400px',
      data: {
        secIletisim: secIletisim,
        islem: "ekle",
        secUye: secUye
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
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.Ad + " " + kayit.Soyad + " Adlı Kişinin İletişim Bilgileri Silinecektir Onaylıyor Musunuz?";
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


  UyeDuzenle(kayit: Uye) {
    this.uyeDialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "Hesabimduzenle",
        hesabim: false
      }
    });

    this.uyeDialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.KullaniciAdi = d.KullaniciAdi
        kayit.Sifre = d.Sifre

        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });

  }

}
