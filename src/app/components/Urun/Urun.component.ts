import { UrunfotoDialogComponent } from './../dialogs/urunfoto-dialog/urunfoto-dialog.component';
import { Urunler } from 'src/app/models/Urunler';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-Urun',
  templateUrl: './Urun.component.html',
  styleUrls: ['./Urun.component.scss']
})
export class UrunComponent implements OnInit {
urunler:Urunler[];
dataSource:any;
fotoDialogRef: MatDialogRef<UrunfotoDialogComponent>
confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
displayedColumns=['UrunFoto','Adi','Aciklama','Fiyat','islemler']
 //sıralama
 @ViewChild(MatSort) sort: MatSort;
 //sayfalama
 @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
this.UrunListele();
  }

  UrunListele(){
    this.apiServis.UrunListe().subscribe((d:Urunler[])=>{
      this.urunler=d;
      this.dataSource=new MatTableDataSource(d);
       //sıralama
       this.dataSource.sort = this.sort;
       //sayfalama
       this.dataSource.paginator = this.paginator;
    })
  }


  FotoGuncelle(kayit: Urunler) {
    this.fotoDialogRef = this.matDialog.open(UrunfotoDialogComponent, {
      width: '400',
      data: kayit
    });
    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.urunId = kayit.urunId;
        this.apiServis.UyeFotoGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    })
  }

}
