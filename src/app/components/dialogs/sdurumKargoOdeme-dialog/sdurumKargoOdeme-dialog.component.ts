import { Odeme } from 'src/app/models/Odeme';
import { Kargo } from './../../../models/Kargo';
import { SiparisDurum } from 'src/app/models/SiparisDurum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sdurumKargoOdeme-dialog',
  templateUrl: './sdurumKargoOdeme-dialog.component.html',
  styleUrls: ['./sdurumKargoOdeme-dialog.component.scss']
})
export class SdurumKargoOdemeDialogComponent implements OnInit {
  dialogBaslik: string;
  acKapa: number = 1;
  yeniKayitsdrurum: SiparisDurum;
  yeniKayitKargo: Kargo;
  yeniKayitOdeme: Odeme;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SdurumKargoOdemeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,

  ) {

    this.islem = data.islem;
    this.acKapa = data.acKapa;
    this.yeniKayitsdrurum = data.kayit;
    this.yeniKayitKargo = data.kayit;
    this.yeniKayitOdeme = data.kayit;


    if (this.islem == 'sdekle') {
      this.dialogBaslik = "Siparis Durum Ekle"
      this.acKapa = data.acKapa;
    }
    if (this.islem == 'kekle') {
      this.dialogBaslik = "Kargo Ekle"
      this.acKapa = data.acKapa;
    }
    if (this.islem == 'oekle') {
      this.dialogBaslik = "Ödeme Ekle"
      this.acKapa = data.acKapa;
    }

    if (this.islem == 'sdduzenle') {
      this.dialogBaslik = "Siparis Durum Düzenle"
      this.acKapa = data.acKapa;

    }
    if (this.islem == 'kduzenle') {
      this.dialogBaslik = "Kargo Düzenle"
      this.acKapa = data.acKapa;
    }
    if (this.islem == 'oduzenle') {
      this.dialogBaslik = "Ödeme Yöntemi Düzenle"
      this.acKapa = data.acKapa;
    }

    this.frm = this.FormOlustur();
  }
  ngOnInit() {

  }


  FormOlustur() {
    return this.frmBuild.group({
      SiparisDurumu1: [this.yeniKayitsdrurum.SiparisDurumu1],
      FirmaAdi: [this.yeniKayitKargo.FirmaAdi],
      Telefon: [this.yeniKayitKargo.Telefon],
      OdemeCesiti: [this.yeniKayitOdeme.OdemeCesiti]
    })
  }
}
