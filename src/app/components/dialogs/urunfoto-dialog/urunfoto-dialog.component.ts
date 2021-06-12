import { Urunler } from 'src/app/models/Urunler';
import { UrunFoto } from './../../../models/UrunFoto';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urunfoto-dialog',
  templateUrl: './urunfoto-dialog.component.html',
  styleUrls: ['./urunfoto-dialog.component.scss']
})
export class UrunfotoDialogComponent implements OnInit {
  secilenFoto: any;
  UrunFoto: UrunFoto = new UrunFoto();
  secUrun: Urunler;
  constructor(
    public dialogRef: MatDialogRef<UrunfotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secUrun = this.data
    this.secUrun.UyeId = "02df47e6-693b-4a08-afd7-3ffa6a707b96"
   }

  ngOnInit() {
  }
  FotoSec(e) {
    var fotolar = e.target.files;
    var foto = fotolar[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenFoto = fr.result;
      this.UrunFoto.fotoData = fr.result.toString();
      this.UrunFoto.fotoUzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }
}
