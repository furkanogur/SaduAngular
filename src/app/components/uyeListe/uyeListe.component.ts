import { Urunler } from './../../models/Urunler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Iletisim } from 'src/app/models/Iletisim';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-uyeListe',
  templateUrl: './uyeListe.component.html',
  styleUrls: ['./uyeListe.component.scss']
})
export class UyeListeComponent implements OnInit {
  kayitlar: Urunler[];
  uyeId: string;
  urunId: string;
  urunler: Urunler[];
  secUye: Uye;
  secUrun: Urunler;
  secIletisim: Iletisim;
  dataSource: any;
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'Aktiflik', 'islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.urunId = p.urunId;
        this.UrunGetir();
        console.log(this.uyeId)
      }

    })

  }

  //uye

  UrunGetir() {
    this.apiServis.UrunById(this.urunId).subscribe((d: Urunler) => {
      this.secUrun = d;
      this.uyeId = this.secUrun.UyeId
      this.apiServis.UyeById(this.uyeId).subscribe((d: Uye) => {
        this.secUye = d;
        console.log(this.secUye.KullaniciAdi)
      });
      this.apiServis.IletisimById(this.uyeId).subscribe((d: Iletisim) => {
        this.secIletisim = d;
        console.log(this.secIletisim.Ad)
      });

    })
  }

  // UyeListele() {
  //     this.apiServis.UyeById(this.uyeId).subscribe((d: Uye) => {
  //       this.secUye = d;
  //       console.log(this.secUye.KullaniciAdi)
  //     });
  //   }

  // IletisimGetir() {
  //     this.apiServis.IletisimById(this.uyeId).subscribe((d: Iletisim) => {
  //       this.secIletisim = d;
  //       console.log(this.secIletisim.Ad)
  //     })
  //   }

}
