import { TedarikDialogComponent } from './../dialogs/tedarik-dialog/tedarik-dialog.component';
import { Urunler } from './../../models/Urunler';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Uye } from './../../models/Uye';
import { ApiService } from './../../services/api.service';
import { TedarikciUrunler } from './../../models/TedarikciUrunler';
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
  kayitlar: TedarikciUrunler[];
  uyeId: string;
  urunler: Urunler[];
  secUye: Uye;
  dataSource: any;
  displayedColumns = ['Adi', 'Aciklama', 'Aktiflik', 'Fiyat', 'UrunUyeSayisi', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<TedarikDialogComponent>
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UrunListele();
    this.route.params.subscribe(p => {
      if (p) {
        this.uyeId = p.uyeId;
        this.UyeGetir();
        this.KayitListele();
      }
    })
  }

  UyeGetir() {
    this.apiServis.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;
    })
  }
  //tedarik
  KayitListele() {
    this.apiServis.TedarikUrunListe(this.uyeId).subscribe((d: TedarikciUrunler[]) => {
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

  // Duzenle(kayit: Urunler) {
  //   this.dialogRef = this.matDialog.open(TedarikDialogComponent, {
  //     width: '400px',
  //     data: {
  //       kayit: kayit,
  //       islem: "duzenle"
  //     }
  //   });

  //   this.dialogRef.afterClosed().subscribe(d => {
  //     if (d) {

  //       kayit.Aktiflik = d.Aktiflik
      


  //       this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {

  //         this.alert.AlertUygula(s);
  //         if (s.islem) {
  //           this.UrunListele();
  //         }
  //       });
  //     }
  //   });

  // }


  Sil(kayit: TedarikciUrunler) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunBilgi.Adi + " Ürün Silinecektir Onaylıyor Musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.TedarikUrunSil(kayit.tedarikId).subscribe((s: Sonuc) => {
          console.log(s);
          this.KayitListele();
        });
      }
    });
  }

}
