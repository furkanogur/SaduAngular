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

@Component({
  selector: 'app-Urun',
  templateUrl: './Urun.component.html',
  styleUrls: ['./Urun.component.scss']
})
export class UrunComponent implements OnInit {
  urunler: Urunler[];
  urunId:string;
  dataSource: any;
  fotoDialogRef: MatDialogRef<UrunfotoDialogComponent>;
  dialogRef:MatDialogRef<UrunDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UrunListele();
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
//Ürün Ekle Sıkıntılı çükü üyeid lazım üyelik gelene kadar hata verecek
  UrunEkle() {
    var yeniKayit: Urunler = new Urunler();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "ekle"
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.UrunFoto = "urun.jpg"
        d.UyeId = "02df47e6-693b-4a08-afd7-3ffa6a707b96"
        this.apiServis.UrunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }

  UrunDuzenle(kayit: Urunler) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.Adi = d.Adi
        kayit.Aciklama = d.Aciklama
        kayit.Fiyat = d.Fiyat
        kayit.Aktiflik =d.Aktiflik

        this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });

  }


  FotoGuncelle(kayit: Urunler,) {
    this.fotoDialogRef = this.matDialog.open(UrunfotoDialogComponent, {
      width: '400',
      data:kayit
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
