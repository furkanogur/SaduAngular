import { UyeDetaylarComponent } from './../dialogs/uye-detaylar/uye-detaylar.component';
import { TedarikciDetayComponent } from './../dialogs/tedarikci-detay/tedarikci-detay.component';
import { Kargo } from './../../models/Kargo';
import { SiparisDurum } from './../../models/SiparisDurum';
import { SiparisduzenleDialogComponent } from './../dialogs/siparisduzenle-dialog/siparisduzenle-dialog.component';
import { Kategoriler } from './../../models/Kategori';
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
import { Siparis } from 'src/app/models/siparis';

@Component({
  selector: 'app-hesabim',
  templateUrl: './hesabim.component.html',
  styleUrls: ['./hesabim.component.scss']
})
export class HesabimComponent implements OnInit {
  kayitlar: Urunler[];
  UyeId: string = localStorage.getItem("uyeId");
  UrunId: string;
  urunler: Urunler[];
  kategoriler: Kategoriler[];
  siparisDurum: SiparisDurum[];
  kargo: Kargo[];
  secUye: Uye;
  TedarikUye: Uye;
  Siparislerveren: Siparis;
  AliciUye: Uye;
  secUrun: Urunler;
  kayit:Siparis;
  siparisdurum:boolean =false;

  secIletisim: Iletisim;
  TedariksecIletisim: Iletisim;
  UyesecIletisim: Iletisim;
  secSiparis: Siparis;
  dataSource: any;
  SiparislerimdataSource: any;
  GonderilecekdataSource: any;
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'Aktiflik', 'islemler']
  SiparislerimdisplayedColumns = ['SiparisUrun', 'SiparisUrun2', 'SiparisUrun3', 'Fiyat', 'SiparisDurum', 'islemler']
  GonderilecekdisplayedColumns = ['SiparisUrun', 'SiparisUrun2', 'SiparisUrun3', 'Fiyat', 'SiparisDurum', 'SiparisUye', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<TedarikDialogComponent>
  TedarikciDetayGorDialogRef: MatDialogRef<TedarikciDetayComponent>
  UyeDetayGorDialogRef: MatDialogRef<UyeDetaylarComponent>
  urunDialogRef: MatDialogRef<UrunDialogComponent>
  uyeDialogRef: MatDialogRef<UyeDialogComponent>
  fotoDialogRef: MatDialogRef<UrunfotoDialogComponent>;
  uyeFotoDialogRef: MatDialogRef<FotoyukleDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  dialogIletisimRef: MatDialogRef<IletisimDialogComponent>
  dialogSiparisDuzenleRef: MatDialogRef<SiparisduzenleDialogComponent>
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
        this.SiparisVerenListele();
        this.SiparisAlanListele();
        this.SiparisDurumListe();
        this.KargoListe();
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

  //Sipariş alan
  SiparisAlanListele() {
    this.apiServis.SiparisalanUById(this.UyeId).subscribe((d: Urunler[]) => {
      this.kayitlar = d;  
      this.GonderilecekdataSource = new MatTableDataSource(d);
      this.GonderilecekdataSource.sort = this.sort
      this.GonderilecekdataSource.paginator = this.paginator
      
    })
    
  }
 
  //Sipariş veren
  SiparisVerenListele() {
    this.apiServis.SiparisVerenById(this.UyeId).subscribe((d: Urunler[]) => {
      this.kayitlar = d; 
      this.SiparislerimdataSource = new MatTableDataSource(d);
      this.SiparislerimdataSource.sort = this.sort
      this.SiparislerimdataSource.paginator = this.paginator
      console.log(this.SiparislerimdataSource)
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
  SiparisGetir(kayit: Siparis){
    this.apiServis.SiparisById(kayit.siparisId).subscribe((d:Siparis)=>{
      this.secSiparis = d;
    })
  }

  SiparisSil(kayit: Siparis) {
    console.log(kayit.SiparisDurum.SiparisDurumu1)
    if(kayit.SiparisDurum.SiparisDurumu1 == "Sipariş Tamamlandı"){
      this.siparisdurum=true;
    }

    this.apiServis.IletisimById(kayit.UyeId).subscribe((d:Iletisim)=>{
      this.secIletisim = d;
    })
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.SiparisUrun.Adi + " Adlı Ürün " + this.secIletisim.Ad+" "+this.secIletisim.Soyad + " Adlı Kişiye Teslim Edildiyse Sipariş Silinecektir Onaylıyormusunuz??";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SiparisSil(kayit.siparisId).subscribe((s: Sonuc) => {
          this.SiparisGetir(kayit)
        });
      }
    });
  }
  
  DetayGor(TedarikUyeId:string){
    this.apiServis.UyeById(TedarikUyeId).subscribe((d: Uye) => {
      this.TedarikUye = d;
      this.apiServis.IletisimById(this.TedarikUye.uyeId).subscribe((d: Iletisim) => {
        this.TedariksecIletisim = d;
        this.TedarikciDetayGorDialogRef = this.matDialog.open(TedarikciDetayComponent, {
          width: '400px',
          data: {
            iletisim:this.TedariksecIletisim,
            uyedetay:this.TedarikUye,
            kayit:this.kayit,
            tedarikUyeId:TedarikUyeId
          }
        });   

      })
    })
   
    
  }

  AliciGor(UyeId:string){
    this.apiServis.UyeById(UyeId).subscribe((d: Uye) => {
      this.AliciUye = d;
      this.apiServis.IletisimById(this.AliciUye.uyeId).subscribe((d: Iletisim) => {
        this.UyesecIletisim = d;
        this.UyeDetayGorDialogRef = this.matDialog.open(UyeDetaylarComponent, {
          width: '400px',
          data: {
            iletisim:this.secIletisim,
            uyedetay:this.AliciUye,
            kayit:this.kayit,
          }
        }); 
      })
    })
    
      
  }


  Duzenle(kayit: Urunler) {
    this.apiServis.KategoriListe().subscribe((d: any = Kategoriler) => {
      this.kategoriler = d;
    })
    var yeniKatKayit: Kategoriler = new Kategoriler();
    this.dialogRef = this.matDialog.open(TedarikDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "duzenle",
        katbilgi: this.kategoriler,
        yeniKatKayit: yeniKatKayit
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
            d.UrunId = kayit.urunId
            console.log(d.UrunId)
            this.apiServis.KategoriUrunEkle(d).subscribe((s: Sonuc) => {
              this.alert.AlertUygula(s);
              if (s.islem) {
              }
            });
            this.KayitListele();
          }
        });
      }
    });

  }
  SiparisDurumListe() {
    this.apiServis.SiparisDurumListe().subscribe((d: SiparisDurum[]) => {
      this.siparisDurum = d;
    })
  }
  KargoListe() {
    this.apiServis.KargoListe().subscribe((d: Kargo[]) => {
      this.kargo = d
    })
  }

  SiparisDuzenle(kayit: Siparis) {
    this.apiServis.SiparisDurumListe().subscribe((d: SiparisDurum[]) => {
      this.siparisDurum = d;
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
           
            this.SiparisAlanListele()
          }
        });
      }
    });

  }




  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: any = Kategoriler) => {
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
            d.UrunId = s.id
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
    this.apiServis.KategoriListe().subscribe((d: any = Kategoriler) => {
      this.kategoriler = d;
    })

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.Adi + " Ürün Silinecektir Onaylıyor Musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriUrunSil(kayit.urunId).subscribe((s: Sonuc) => {
          console.log(s);
          this.apiServis.UrunSil(kayit.urunId).subscribe((s: Sonuc) => {
            console.log(s);
            this.KayitListele();
          });
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
