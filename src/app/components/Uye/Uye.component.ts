import { ApiService } from './../../services/api.service';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-Uye',
  templateUrl: './Uye.component.html',
  styleUrls: ['./Uye.component.scss']
})
export class UyeComponent implements OnInit {
uyeler:Uye[];
dataSource:any;
displayedColumns=['KullaniciAdi','Sifre','Email','islemler']
//sıralama
@ViewChild(MatSort) sort:MatSort;
//sayfalama
@ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(
    public apiServis:ApiService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele(){
  this.apiServis.UyeListe().subscribe((d:Uye[])=>{
  this.uyeler=d;
  this.dataSource =new MatTableDataSource(this.uyeler);
  //sıralama
  this.dataSource.sort=this.sort;
  //sayfalama
  this.dataSource.paginator= this.paginator;
  });
  }

  UyeFiltrele(e){
    var deger =e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }

}
