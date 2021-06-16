import { KategoriDialogComponent } from './../dialogs/kategori-dialog/kategori-dialog.component';
import { Kategoriler } from './../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.scss']
})
export class KategorilerComponent implements OnInit {

  kategoriler: Kategoriler[];
  dataSource: any;
  displayedColumns = ['KatAdi', 'UstKategoriBilgi', 'Aktiflik', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<KategoriDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  KategoriEkle() {
    var yeniKayit: Kategoriler = new Kategoriler();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "ekle",
        ustKategori: this.kategoriler
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });
  }


  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: any = Kategoriler) => {
      this.kategoriler = d;
      console.log(d)
      console.log(d.UstKategoriBilgi)
      this.dataSource = new MatTableDataSource(this.kategoriler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  KategoriDuzenle(kayit: Kategoriler) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "duzenle",
        ustKategori: this.kategoriler
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.KatAdi = d.KatAdi
        kayit.ustKategoriId = d.ustKategoriId
        kayit.Aktiflik = d.Aktiflik

        this.apiServis.KategoriDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });
  }

  KategoriSil(kayit: Kategoriler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.KatAdi + " Kategorisi Silinecektir Onaylıyor Musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriSil(kayit.kategoriId).subscribe((s: Sonuc) => {
          console.log(s);
          this.KategoriListele();
        });
      }
    });
  }

}
