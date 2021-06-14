import { Kategoriler } from 'src/app/models/Kategori';
import { Urunler } from './../../../models/Urunler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.scss']
})
export class UrunDialogComponent implements OnInit {
  
  dialogBaslik: string;
  katbilgi:Kategoriler;
  uyeId:string;
  yeniKayit: Urunler;
  yeniKatKayit:Kategoriler;
  islem: string;
  frm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<UrunDialogComponent>,
 
   
  ) { 
    this.katbilgi = data.katbilgi;
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    this.yeniKatKayit=data.yeniKatKayit;


    if (this.islem == 'ekle') {
      this.dialogBaslik = "Ürün Ekle"
    }

    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Ürün Düzenle"
    }
    this.frm = this.FormOlustur();

  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      Adi: [this.yeniKayit.Adi],
      Aciklama: [this.yeniKayit.Aciklama],
      UyeId: [this.yeniKayit.UyeId],
      Aktiflik: [this.yeniKayit.Aktiflik],
      Fiyat: [this.yeniKayit.Fiyat],
      kategoriId: [this.yeniKatKayit.kategoriId],
    })
  }

}
