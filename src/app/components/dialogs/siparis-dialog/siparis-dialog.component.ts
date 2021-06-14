import { Odeme } from './../../../models/Odeme';
import { Uye } from './../../../models/Uye';
import { Urunler } from './../../../models/Urunler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Siparis } from 'src/app/models/siparis';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-siparis-dialog',
  templateUrl: './siparis-dialog.component.html',
  styleUrls: ['./siparis-dialog.component.css']
})
export class SiparisDialogComponent implements OnInit {
  uyeId:string=localStorage.getItem("uyeId")
  dialogBaslik: string;
  islem: string;
  yeniKayit:Siparis;
  frm: FormGroup;
  secUrun:Urunler
  secUye:Uye
  secOdeme:Odeme
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<SiparisDialogComponent>,
    public apiServis: ApiService
 
  ) {

  this.islem = data.islem;
  this.secUrun=data.secUrun;
  this.secUye=data.secUye;
  this.yeniKayit = data.kayit;
  this.secOdeme=data.secOdeme;
  console.log(this.secOdeme)
  



  if (this.islem == 'ekle') {
    this.dialogBaslik = "Ürün Ekle"
  }

  this.frm = this.FormOlustur();

}

ngOnInit() {
}

FormOlustur() {
  return this.frmBuild.group({
    Adres: [this.yeniKayit.Adres],
    OdemeId: [this.yeniKayit.OdemeId],
  })
}
}

