import { UrunDialogComponent } from './../dialogs/urun-dialog/urun-dialog.component';
import { UrunfotoDialogComponent } from './../dialogs/urunfoto-dialog/urunfoto-dialog.component';
import { Urunler } from 'src/app/models/Urunler';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Kategoriler } from 'src/app/models/Kategori';

@Component({
  selector: 'app-Urun',
  templateUrl: './Urun.component.html',
  styleUrls: ['./Urun.component.scss']
})
export class UrunComponent implements OnInit {
  kategoriler: Kategoriler[];
  UyeId: string = localStorage.getItem("uyeId");
  urunler: Urunler[];
  urunId: string;
  dataSource: any;
  fotoDialogRef: MatDialogRef<UrunfotoDialogComponent>;
  dialogRef: MatDialogRef<UrunDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,

  ) { }

  ngOnInit() {
    this.UyeId = localStorage.getItem("uyeId");
    this.UrunListele();
    this.KategoriListele();
  }

  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urunler[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
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
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "ekle",
        katbilgi: this.kategoriler,
        yeniKatKayit: yeniKatKayit
      }
    });
    console.log(yeniKatKayit)
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.UrunFoto = "urun.jpg"
        d.UyeId = this.UyeId
        console.log(d)
        //kat id almayı başardık
        this.apiServis.UrunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
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

  UrunDuzenle(kayit: Urunler) {
    var yeniKatKayit: Kategoriler = new Kategoriler();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
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

        kayit.Adi = d.Adi
        kayit.Aciklama = d.Aciklama
        kayit.Fiyat = d.Fiyat
        kayit.Aktiflik = d.Aktiflik

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
            this.UrunListele();
          }
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
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.Adi + " Ürünü Silinecektir Onaylıyor Musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriUrunSil(kayit.urunId).subscribe((s: Sonuc) => {
          console.log(s);
          this.apiServis.UrunSil(kayit.urunId).subscribe((s: Sonuc) => {
            console.log(s);
            this.UrunListele();
          });
        });
      }
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
            this.UrunListele();
          }
        })
      }
    })
  }

}
