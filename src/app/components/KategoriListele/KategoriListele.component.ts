import { KategoriUrun } from './../../models/KategoriUrun';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-KategoriListele',
  templateUrl: './KategoriListele.component.html',
  styleUrls: ['./KategoriListele.component.css']
})
export class KategoriListeleComponent implements OnInit {
  KatUrun: KategoriUrun[];
  katId: string;
  KatAdi:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public frmbuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(p => {
      if (p) {
        this.katId = p.katId;
        this.KatAdi=p.KatAdi;
        this.UrunListele();   
        console.log(this.KatAdi)  
       
      }
    })
  }

  UrunListele() {
    this.apiServis.KategoriUrunListe(this.katId).subscribe((d: KategoriUrun[]) => {
      this.KatUrun = d;
      
      console.log(this.KatUrun)  
    })
  }

  UrunFiltrele(e) {
    var deger = e.target.value;
    this.KatUrun.filter = deger.trim().toLowerCase();
    console.log(this.KatUrun)

  }

}
