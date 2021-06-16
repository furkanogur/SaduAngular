import { SiparisDurum } from './../models/SiparisDurum';
import { Kargo } from './../models/Kargo';
import { Siparis } from 'src/app/models/siparis';
import { Odeme } from './../models/Odeme';
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
  UrunKategoriListe(urunKatId: string) {
    return this.http.get(this.apiUrl + "urunkategoriliste/" + urunKatId);
  }
  KategoriUrunListe(katUrunId: string) {
    return this.http.get(this.apiUrl + "kategoriurunliste/" + katUrunId);
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


  //Odeme Yontemi

  OdemeListe() {
    return this.http.get(this.apiUrl + "odemeliste");
  }
  OdemeById(odemeId: string) {
    return this.http.get(this.apiUrl + "odemebyid/" + odemeId);
  }
  OdemEekle(Odeme: Odeme) {
    return this.http.post(this.apiUrl + "odemeekle", Odeme);
  }
  OdemeDuzenle(Odeme: Odeme) {
    return this.http.put(this.apiUrl + "odemeduzenle", Odeme);
  }
  OdemeSil(odemeId: string) {
    return this.http.delete(this.apiUrl + "odemesil/" + odemeId);
  }
  //Siparis Durumu
  SiparisDurumListe() {
    return this.http.get(this.apiUrl + "siparisdurumliste");
  }
  SiparisDurumById(siparisdurumId: string) {
    return this.http.get(this.apiUrl + "siparisdurumbyid/" + siparisdurumId);
  }
  SiparisDurumEkle(siparisDurum: SiparisDurum) {
    return this.http.post(this.apiUrl + "siparisdurumekle", siparisDurum);
  }
  SiparisDurumuDuzenle(siparisDurum: SiparisDurum) {
    return this.http.put(this.apiUrl + "siparisdurumuduzenle", siparisDurum);
  }
  SiparisDurumuSil(siparisId: string) {
    return this.http.delete(this.apiUrl + "siparisdurumusil/" + siparisId);
  }

  //Kargo

  KargoListe() {
    return this.http.get(this.apiUrl + "kargoliste");
  }
  kargobyid(kargoId: string) {
    return this.http.get(this.apiUrl + "kargobyid/" + kargoId);
  }
  KargoEkle(kargo: Kargo) {
    return this.http.post(this.apiUrl + "kargoekle", kargo);
  }
  KargoDuzenle(kargo: Kargo) {
    return this.http.put(this.apiUrl + "kargoduzenle", kargo);
  }
  KargoSil(kargoId: string) {
    return this.http.delete(this.apiUrl + "kargosil/" + kargoId);
  }

  //Siparis İslemleri
  SiparisListe() {
    return this.http.get(this.apiUrl + "siparisliste");
  }
  SiparisById(siparisId: string) {
    return this.http.get(this.apiUrl + "urunbyid/" + siparisId);
  }
  SiparisEkle(siparis: Siparis) {
    return this.http.post(this.apiUrl + "siparisekle", siparis);
  }
  SiparisDuzenle(siparis: Siparis) {
    return this.http.put(this.apiUrl + "siparisduzenle", siparis);
  }
  SiparisSil(siparisId: string) {
    return this.http.delete(this.apiUrl + "siparissil/" + siparisId);
  }

  SiparisVerenById(uyeId: string) {
    return this.http.get(this.apiUrl + "siparisverenbyid/" + uyeId);
  }
  SiparisalanUById(uyeId: string) {
    return this.http.get(this.apiUrl + "siparisalanbyid/" + uyeId);
  }



  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    var sonuc: boolean = false;
    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });

    }

    return sonuc;
  }


}
