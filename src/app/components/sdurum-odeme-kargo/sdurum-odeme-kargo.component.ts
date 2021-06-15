import { SdurumKargoOdemeDialogComponent } from './../dialogs/sdurumKargoOdeme-dialog/sdurumKargoOdeme-dialog.component';
import { SiparisDurum } from 'src/app/models/SiparisDurum';
import { Odeme } from 'src/app/models/Odeme';
import { Kargo } from './../../models/Kargo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-sdurum-odeme-kargo',
  templateUrl: './sdurum-odeme-kargo.component.html',
  styleUrls: ['./sdurum-odeme-kargo.component.scss']
})
export class SdurumOdemeKargoComponent implements OnInit {
  sdurumdisplayedColumns = ['SiparisDurumu1','islemler']
  kargodisplayedColumns = ['FirmaAdi', 'Telefon','islemler']
  odemedisplayedColumns = ['OdemeCesiti','islemler']
  sdurumdataSource: any;
  kargodataSource: any;
  odemedataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sDurum:SiparisDurum[];
  kargo:Kargo[];
  odeme:Odeme[];
  sDurumdialogRef: MatDialogRef<SdurumKargoOdemeDialogComponent>
  KargodialogRef: MatDialogRef<SdurumKargoOdemeDialogComponent>
  OdemedialogRef: MatDialogRef<SdurumKargoOdemeDialogComponent>
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public frmbuilder: FormBuilder,
  ) { }

  ngOnInit() {
this.KargoListele();
this.OdemeListele();
this.SiparisDurumListele();

    

  }


  SiparisDurumListele() {
    this.apiServis.SiparisDurumListe().subscribe((d: SiparisDurum[]) => {
      this.sDurum = d;
      this.sdurumdataSource = new MatTableDataSource(d);
      this.sdurumdataSource.sort = this.sort
      this.sdurumdataSource.paginator = this.paginator

    })
  }

  KargoListele() {
    this.apiServis.KargoListe().subscribe((d: Kargo[]) => {
      this.kargo = d;
      this.kargodataSource = new MatTableDataSource(d);
      this.kargodataSource.sort = this.sort
      this.kargodataSource.paginator = this.paginator

    })
  }

  OdemeListele() {
    this.apiServis.OdemeListe().subscribe((d: Odeme[]) => {
      this.odeme = d;
      this.odemedataSource = new MatTableDataSource(d);
      this.odemedataSource.sort = this.sort
      this.odemedataSource.paginator = this.paginator

    })
  }

  SdurumDuzenle(kayit: SiparisDurum) {
    this.sDurumdialogRef = this.matDialog.open(SdurumKargoOdemeDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "sdduzenle",
        acKapa: 1
      }
    });
    this.sDurumdialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.SiparisDurumu1 = d.SiparisDurumu1
        this.apiServis.SiparisDurumuDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisDurumListele();
          }
        });
      }
    });
  }


  KargoDuzenle(kayit: Kargo) {
    this.sDurumdialogRef = this.matDialog.open(SdurumKargoOdemeDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "kduzenle",
        acKapa: 2
      }
    });
    this.sDurumdialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.FirmaAdi = d.FirmaAdi
        kayit.Telefon = d.Telefon
        this.apiServis.KargoDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KargoListele();
          }
        });
      }
    });

  }


  OdemeDuzenle(kayit: Odeme) {
    this.sDurumdialogRef = this.matDialog.open(SdurumKargoOdemeDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: "oduzenle",
        acKapa: 3
      }
    });
    this.sDurumdialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.OdemeCesiti = d.OdemeCesiti
        this.apiServis.OdemeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OdemeListele();
          }
        });
      }
    });

  }


  sdEkle() {
    var yeniKayit: SiparisDurum = new SiparisDurum();
    this.sDurumdialogRef = this.matDialog.open(SdurumKargoOdemeDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "sdekle",
        acKapa:1
      }
    });
    this.sDurumdialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SiparisDurumEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SiparisDurumListele();
          }
        });
      }
    });
  }

  kargoEkle() {
    var yeniKayit: Kargo = new Kargo();
    this.sDurumdialogRef = this.matDialog.open(SdurumKargoOdemeDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "kekle",
        acKapa:2
      }
    });
    this.sDurumdialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KargoEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KargoListele();
          }
        });
      }
    });
  }

  OdemeEkle() {
    var yeniKayit: Odeme = new Odeme();
    this.sDurumdialogRef = this.matDialog.open(SdurumKargoOdemeDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: "oekle",
        acKapa:3
      }
    });
    this.sDurumdialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OdemEekle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OdemeListele();
          }
        });
      }
    });
  }
}
