import { Uye } from './../../models/Uye';
import { Odeme } from './../../models/Odeme';
import { Iletisim } from './../../models/Iletisim';
import { Urunler } from './../../models/Urunler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { SiparisDialogComponent } from '../dialogs/siparis-dialog/siparis-dialog.component';
import { Siparis } from 'src/app/models/siparis';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-Siparis',
  templateUrl: './Siparis.component.html',
  styleUrls: ['./Siparis.component.css']
})
export class SiparisComponent implements OnInit {
  odeme: Odeme[];
  uyeId: string = localStorage.getItem("uyeId")
  UrunId: string;
  secUrun: Urunler;
  UyeId: string;
  Fiyat: number;
  secUye: Uye;
  secIletisim: Iletisim;
  secSiparis: Siparis;
  TedarikUyeId: string;
  urunFoto: string;
  dialogRef: MatDialogRef<SiparisDialogComponent>
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.UrunId = p.urunId;
        this.UrunGetir();
        this.OdemeListele()
      }
    })
  }

  UrunGetir() {
    this.apiServis.UrunById(this.UrunId).subscribe((d: Urunler) => {
      this.secUrun = d;
      this.UyeId = this.secUrun.UyeId
      this.Fiyat = this.secUrun.Fiyat
      this.urunFoto = this.secUrun.UrunFoto
      this.apiServis.UyeById(this.UyeId).subscribe((d: Uye) => {
        this.secUye = d;
        this.TedarikUyeId = this.secUye.uyeId
      });
      this.apiServis.IletisimById(this.UyeId).subscribe((d: Iletisim) => {
        this.secIletisim = d;
      });

    })
  }

  OdemeListele() {
    this.apiServis.OdemeListe().subscribe((d: any = Odeme) => {
      this.odeme = d;
    })
  }

  SiparisEkle() {
    this.apiServis.OdemeListe().subscribe((d: any = Odeme) => {
      this.odeme = d;
      console.log(this.odeme)
    })
    var yeniKayit: Siparis = new Siparis();
    this.dialogRef = this.matDialog.open(SiparisDialogComponent, {
      width: '500px',
      data: {
        kayit: yeniKayit,
        islem: "ekle",
        secUrun: this.secUrun,
        secUye: this.secUye,
        secOdeme: this.odeme
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log(d.OdemeId)
        d.UyeId = this.uyeId
        d.UrunId = this.UrunId
        d.Fiyat = this.Fiyat
        d.TedarikUyeId = this.TedarikUyeId
        d.KargoUcreti = 15
        d.SiparisDurumuId = "1851b696-d421-4cf0-b53d-a18428490c53"
        d.KargoId = "7f3d3bd3-40ec-43f8-810e-5c02a71b0b0c"
        d.SiparisTarihi = "2021-06-15T11:43:54.738Z"
        this.apiServis.SiparisEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          console.log(d)
          if (s.islem) {
          }
        });
      }
    });

  }

}
