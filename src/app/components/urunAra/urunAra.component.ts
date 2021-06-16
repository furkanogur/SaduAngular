import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { KategoriUrun } from 'src/app/models/KategoriUrun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-urunAra',
  templateUrl: './urunAra.component.html',
  styleUrls: ['./urunAra.component.css']
})
export class UrunAraComponent implements OnInit {
  KatUrun: KategoriUrun[];
  katId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'islemler']
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
      }
      this.UrunListele()
    })
  }

  UrunListele() {
    this.apiServis.KategoriUrunListe(this.katId).subscribe((d: KategoriUrun[]) => {
      this.KatUrun = d;
      this.dataSource = new MatTableDataSource(this.KatUrun);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }
}