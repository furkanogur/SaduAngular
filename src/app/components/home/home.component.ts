import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Kategoriler } from 'src/app/models/Kategori';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Odeme } from 'src/app/models/Odeme';
import { Urunler } from 'src/app/models/Urunler';
import { Uye } from 'src/app/models/Uye';
import { Iletisim } from 'src/app/models/Iletisim';
import { Siparis } from 'src/app/models/siparis';
import { SiparisDialogComponent } from '../dialogs/siparis-dialog/siparis-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uyeAdi: string;
  kategoriler: Kategoriler[];
  kategoriById: string;
  urunler: Urunler[];
  secKategori: Kategoriler[];
  kategoriId: string;
  frm: FormGroup;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  odeme: Odeme[];
  uyeId: string = localStorage.getItem("uyeId")
  UrunId: string;
  secUrun: Urunler;
  UyeId: string;
  Fiyat: number;
  secUye: Uye;
  secIletisim: Iletisim;
  secSiparis: Siparis;
  TedarikUyeId: string;
  urunFoto: string;
  dialogRef: MatDialogRef<SiparisDialogComponent>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['UrunFoto', 'Adi', 'Aciklama', 'Fiyat', 'islemler']
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public frmbuilder: FormBuilder,
  ) {
    this.frm = new FormGroup({
      kategoriId: new FormControl(),
    })
    console.log(this.kategoriId)
  }

  ngOnInit() {
    if (this.apiServis.oturumKontrol) {
      this.uyeAdi = localStorage.getItem("uyeadi");
    }
    this.KategoriListele();
    this.UrunListele()
    console.log(this.kategoriId)
    this.route.params.subscribe(p => {
      if (p) {
        this.UrunId = p.urunId;
        this.UrunListele();
        this.OdemeListele()
      }
    })
  }
  OturumKapat() {
    localStorage.clear();
    location.href = ("/");
  }




  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: any = Kategoriler) => {
      this.kategoriler = d;
    })
  }
  KategoriUrunById(akategoriId: string) {
    this.apiServis.KategoriUrunListe(akategoriId).subscribe((d: any = Kategoriler) => {
      this.secKategori = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort

      console.log(this.secKategori);
    })
  }

  katıdgetir(kategoriId: string) {
    console.log(kategoriId);
  }


  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urunler[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
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

  OdemeListele() {
    this.apiServis.OdemeListe().subscribe((d: any = Odeme) => {
      this.odeme = d;
    })
  }

  SiparisEkle() {
    this.apiServis.OdemeListe().subscribe((d: any = Odeme) => {
      this.odeme = d;
      console.log(this.odeme)
    })
    var yeniKayit: Siparis = new Siparis();
    this.dialogRef = this.matDialog.open(SiparisDialogComponent, {
      width: '500px',
      data: {
        kayit: yeniKayit,
        islem: "ekle",
        secUrun: this.secUrun,
        secUye: this.secUye,
        secOdeme: this.odeme



      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log(d.OdemeId)
        d.UyeId = this.uyeId
        d.UrunId = this.UrunId
        d.Fiyat = this.Fiyat
        d.TedarikUyeId = this.TedarikUyeId
        d.KargoUcreti = 15
        d.SiparisDurumuId = "1851b696-d421-4cf0-b53d-a18428490c53"
        d.KargoId = "7f3d3bd3-40ec-43f8-810e-5c02a71b0b0c"
        d.SiparisTarihi = "2021-06-14"
        this.apiServis.SiparisEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          console.log(d)
          if (s.islem) {
          }
        });
      }
    });

  }

}


