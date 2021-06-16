import { Iletisim } from './../../../models/Iletisim';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-iletisim-dialog',
  templateUrl: './iletisim-dialog.component.html',
  styleUrls: ['./iletisim-dialog.component.css']
})
export class IletisimDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Iletisim;
  islem: string;
  secUye: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<IletisimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.secUye = data.secUye;
    this.yeniKayit = data.secIletisim;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "İletişim Ekle"

    }

    if (this.islem == 'duzenle') {
      this.dialogBaslik = "İletişim Düzenle"

    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuild.group({
      Ad: [this.yeniKayit.Ad],
      Soyad: [this.yeniKayit.Soyad],
      Adres: [this.yeniKayit.Adres],
      Telefon: [this.yeniKayit.Telefon],
      UyeId: [this.secUye],
    })
  }
}
