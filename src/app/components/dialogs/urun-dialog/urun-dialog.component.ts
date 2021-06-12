import { Urunler } from './../../../models/Urunler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.scss']
})
export class UrunDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Urunler;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) { 

    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Üye Ekle"

    }

    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Üye Düzenle"

    }
    this.frm = this.FormOlustur();

  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      Adi: [this.yeniKayit.Adi],
      Aciklama: [this.yeniKayit.Aciklama],
      Aktiflik: [this.yeniKayit.Aktiflik],
      Fiyat: [this.yeniKayit.Fiyat],
    })
  }

}
