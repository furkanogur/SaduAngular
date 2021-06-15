import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Iletisim } from 'src/app/models/Iletisim';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye-detaylar',
  templateUrl: './uye-detaylar.component.html',
  styleUrls: ['./uye-detaylar.component.css']
})
export class UyeDetaylarComponent implements OnInit {
  iletisim:Iletisim
  uyedetay:Uye
  constructor(public dialogRef: MatDialogRef<UyeDetaylarComponent>,public apiServis: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.iletisim = data.iletisim;
    this.uyedetay = data.uyedetay;
   }

  ngOnInit() {
  }

}
