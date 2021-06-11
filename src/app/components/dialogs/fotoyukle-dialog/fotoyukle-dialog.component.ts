import { ApiService } from 'src/app/services/api.service';
import { UyeFoto } from './../../../models/UyeFoto';
import { Component, Inject, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.scss']
})
export class FotoyukleDialogComponent implements OnInit {
  secilenFoto: any;
  UyeFoto: UyeFoto = new UyeFoto();
  secUye: Uye;
  constructor(
    public dialogRef: MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secUye = this.data
  }

  ngOnInit() {
  }
  FotoSec(e) {
    var fotolar = e.target.files;
    var foto = fotolar[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenFoto = fr.result;
      this.UyeFoto.fotoData = fr.result.toString();
      this.UyeFoto.fotoUzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }

}
