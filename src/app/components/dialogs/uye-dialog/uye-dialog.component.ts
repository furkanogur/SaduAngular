import { Uye } from './../../../models/Uye';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
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
      KullaniciAdi: [this.yeniKayit.KullaniciAdi],
      Sifre: [this.yeniKayit.Sifre],
      Email: [this.yeniKayit.Email],
      admin: [this.yeniKayit.admin],
    })
  }

}
