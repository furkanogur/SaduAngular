import { KategoriUrun } from './../models/KategoriUrun';
import { Kategoriler } from './../models/Kategori';
import { UrunFoto } from './../models/UrunFoto';
import { UyeFoto } from './../models/UyeFoto';
import { Iletisim } from './../models/Iletisim';
import { TedarikciUrunler } from './../models/TedarikciUrunler';
import { Urunler } from './../models/Urunler';
import { Uye } from './../models/Uye';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44384/api/";
  siteUrl = "https://localhost:44384/";

  constructor(
    public http: HttpClient
  ) { }


  //uye islemleri
  UyeListe() {
    return this.http.get(this.apiUrl + "uyeliste");
  }
  UyeById(uyeId: string) {
    return this.http.get(this.apiUrl + "uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "uyeekle", uye);
  }
  UyeFotoGuncelle(uyefoto: UyeFoto) {
    return this.http.post(this.apiUrl + "uyefotoguncelle", uyefoto);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "uyeduzenle", uye);
  }
  UyeSil(uyeId: string) {
    return this.http.delete(this.apiUrl + "uyesil/" + uyeId);
  }

  //Urun İslemleri
  UrunListe() {
    return this.http.get(this.apiUrl + "urunliste");
  }
  UrunById(urunId: string) {
    return this.http.get(this.apiUrl + "urunbyid/" + urunId);
  }
  UrunEkle(urun: Urunler) {
    return this.http.post(this.apiUrl + "urunekle", urun);
  }
  UrunDuzenle(urun: Urunler) {
    return this.http.put(this.apiUrl + "urunduzenle", urun);
  }
  UrunSil(urunId: string) {
    return this.http.delete(this.apiUrl + "urunsil/" + urunId);
  }

  UrunFotoGuncelle(urunfoto: UrunFoto) {
    return this.http.post(this.apiUrl + "urunfotoguncelle", urunfoto);
  }

  //tedarikçi
  TedarikUrunListe(uyeTedId: string) {
    return this.http.get(this.apiUrl + "tedarikuyeliste/" + uyeTedId);
  }

  // UrunTedarikListe(urunTedId:string){
  //   return this.http.get(this.apiUrl+"tedarikurunliste/"+urunTedId);
  // }
  // TedarikciEkle(kayit:TedarikciUrunler){
  //   return this.http.post(this.apiUrl+"tedarikciekle",kayit)
  // }
  // TedarikUrunSil(tuId:string){
  //   return this.http.delete(this.apiUrl+"tedarikurunsil/"+tuId)
  // }
  // TedarikUrunDuzenle(urun:Urunler){
  //   return this.http.put(this.apiUrl+"urunduzenle",urun);
  // }



  //iletisim

  IletisimListe() {
    return this.http.get(this.apiUrl + "iletisimliste");
  }
  IletisimById(uyeId: string) {
    return this.http.get(this.apiUrl + "iletisimbyid/" + uyeId);
  }
  IletisimEkle(iletisim: Iletisim) {
    return this.http.post(this.apiUrl + "iletisimekle", iletisim);
  }
  IletisimDuzenle(iletisim: Iletisim) {
    return this.http.put(this.apiUrl + "iletisimduzenle", iletisim);
  }
  IletisimSil(uyeId: string) {
    return this.http.delete(this.apiUrl + "iletisimsil/" + uyeId);
  }


  //Oturum

  tokenAl(email: string, parola: string) {
    var data = "username=" + email + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader })
  }

  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  oturumKontrolAdmin() {

    if (localStorage.getItem("uyeYetkileri") == '["Admin"]') {

      return true;
    }
    else {
      return false;
    }
  }

  //kategori

  KategoriListe() {
    return this.http.get(this.apiUrl + "kategoriliste");
  }
  KategoriById(katId: string) {
    return this.http.get(this.apiUrl + "kategoribyid/" + katId);
  }
  KategoriEkle(kategori: Kategoriler) {
    return this.http.post(this.apiUrl + "kategoriekle", kategori);
  }
  KategoriDuzenle(kategori: Kategoriler) {
    return this.http.put(this.apiUrl + "kategoriduzenle", kategori);
  }
  KategoriSil(katId: string) {
    return this.http.delete(this.apiUrl + "kategorisil/" + katId);
  }

  //kategoriUrun (ARA TABLO)
  UrunKategoriListe(urunKatId:string) {
    return this.http.get(this.apiUrl + "urunkategoriliste/"+urunKatId);
  }
  KategoriUrunListe(katUrunId:string) {
    return this.http.get(this.apiUrl + "kategoriurunliste/"+katUrunId);
  }
  KategoriUrunEkle(kategoriUrun: KategoriUrun) {
    return this.http.post(this.apiUrl + "kategoriurunekle", kategoriUrun);
  }
  KategoriUrunDuzenle(kategoriUrun: KategoriUrun) {
    return this.http.put(this.apiUrl + "kategoriurunduzenle", kategoriUrun);
  }
  KategoriUrunSil(katUrunId: string) {
    return this.http.delete(this.apiUrl + "kategoriurunsil/" + katUrunId);
  }

}
