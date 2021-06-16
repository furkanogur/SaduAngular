import { Kategoriler } from './../../models/Kategori';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  uyeAdi: string;
  kategoriler: Kategoriler[];
  kategoriById: string;
  secKategori: Kategoriler[];
  kategoriId: string;
  frm: FormGroup;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['Adi', 'Aciklama', 'Fiyat']
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
    console.log(this.kategoriId)

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
}
