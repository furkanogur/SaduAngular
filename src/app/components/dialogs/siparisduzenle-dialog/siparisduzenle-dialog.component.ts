import { Kargo } from './../../../models/Kargo';
import { SiparisDurum } from './../../../models/SiparisDurum';
import { Urunler } from './../../../models/Urunler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Siparis } from 'src/app/models/siparis';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-siparisduzenle-dialog',
  templateUrl: './siparisduzenle-dialog.component.html',
  styleUrls: ['./siparisduzenle-dialog.component.css']
})
export class SiparisduzenleDialogComponent implements OnInit {
  uyeId: string = localStorage.getItem("uyeId")
  dialogBaslik: string;
  islem: string;
  secUrun: Urunler;
  frm: FormGroup;
  secSiparis: Siparis
  secKargo: Kargo
  secSiparisDurum: SiparisDurum
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<SiparisduzenleDialogComponent>,
    public apiServis: ApiService

  ) {

    this.islem = data.islem;
    this.secSiparis = data.secSiparis;
    this.secUrun = data.secUrun;
    this.secSiparisDurum = data.secSiparisDurum;
    this.secKargo = data.secKargo;
    console.log(this.secSiparis)
    console.log(this.secUrun)




    if (this.islem == 'ekle') {
      this.dialogBaslik = "Ürün Ekle"
    }

    this.frm = this.FormOlustur();

  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      KargoId: [this.secSiparis.KargoId],
      SiparisDurumuId: [this.secSiparis.SiparisDurumuId],
      KargoUcreti: [this.secSiparis.KargoUcreti],
    })
  }
}