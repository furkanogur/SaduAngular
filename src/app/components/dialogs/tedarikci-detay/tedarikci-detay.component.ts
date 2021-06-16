import { Uye } from './../../../models/Uye';
import { Iletisim } from './../../../models/Iletisim';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tedarikci-detay',
  templateUrl: './tedarikci-detay.component.html',
  styleUrls: ['./tedarikci-detay.component.css']
})
export class TedarikciDetayComponent implements OnInit {
  iletisim: Iletisim
  uyedetay: Uye
  tedarikUyeId: String;
  constructor(public dialogRef: MatDialogRef<TedarikciDetayComponent>, public apiServis: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.iletisim = data.iletisim;
    this.uyedetay = data.uyedetay;
    this.tedarikUyeId = data.tedarikUyeId;
  }

  ngOnInit() {
  }



}
