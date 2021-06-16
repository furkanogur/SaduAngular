import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategoriler } from 'src/app/models/Kategori';
import { KategorilerComponent } from '../../kategoriler/kategoriler.component';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.scss']
})
export class KategoriDialogComponent implements OnInit {
  ustKategori: Kategoriler;
  dialogBaslik: string;
  uyeId: string;
  yeniKayit: Kategoriler;
  islem: string;
  kategoriId: number;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KategorilerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    this.ustKategori = data.ustKategori

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kategori Ekle"
    }

    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kategori Düzenle"
    }
    this.frm = this.FormOlustur();

  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      KatAdi: [this.yeniKayit.KatAdi],
      ustKategoriId: [this.yeniKayit.kategoriId],
      Aktiflik: [this.yeniKayit.Aktiflik]
    })
  }

}
