import { UrunFoto } from './../models/UrunFoto';
import { UyeFoto } from './../models/UyeFoto';
import { Iletisim } from './../models/Iletisim';
import { TedarikciUrunler } from './../models/TedarikciUrunler';
import { Urunler } from './../models/Urunler';
import { Uye } from './../models/Uye';

import { HttpClient } from '@angular/common/http';
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
    UyeListe(){
      return this.http.get(this.apiUrl+"uyeliste");
    }
    UyeById(uyeId:string){
      return this.http.get(this.apiUrl+"uyebyid/"+uyeId);
    }
    UyeEkle(uye:Uye){
      return this.http.post(this.apiUrl+"uyeekle",uye);
    }
    UyeFotoGuncelle(uyefoto:UyeFoto){
      return this.http.post(this.apiUrl+"uyefotoguncelle",uyefoto);
    }
    UyeDuzenle(uye:Uye){
      return this.http.put(this.apiUrl+"uyeduzenle",uye);
    }
    UyeSil(uyeId:string){
      return this.http.delete(this.apiUrl+"uyesil/"+uyeId);
    }

    //Urun İslemleri
    UrunListe(){
      return this.http.get(this.apiUrl+"urunliste");
    }
    UrunById(urunId:string){
      return this.http.get(this.apiUrl+"urunbyid/"+urunId);
    }
    UrunEkle(urun:Urunler){
      return this.http.post(this.apiUrl+"urunekle",urun);
    }
    UrunDuzenle(urun:Urunler){
      return this.http.put(this.apiUrl+"urunduzenle",urun);
    }
    UrunSil(urunId:string){
      return this.http.delete(this.apiUrl+"urunsil/"+urunId);
    }

    UrunFotoGuncelle(urunfoto:UrunFoto){
      return this.http.post(this.apiUrl+"urunfotoguncelle",urunfoto);
    }

    //tedarikçi
    TedarikUrunListe(uyeTedId:string){
      return this.http.get(this.apiUrl+"tedarikuyeliste/"+uyeTedId);
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

    IletisimListe(){
      return this.http.get(this.apiUrl+"iletisimliste");
    }
    IletisimById(uyeId:string){
      return this.http.get(this.apiUrl+"iletisimbyid/"+uyeId);
    }
    IletisimEkle(iletisim:Iletisim){
      return this.http.post(this.apiUrl+"iletisimekle",iletisim);
    }
    IletisimDuzenle(iletisim:Iletisim){
      return this.http.put(this.apiUrl+"iletisimduzenle",iletisim);
    }
    IletisimSil(uyeId:string){
      return this.http.delete(this.apiUrl+"iletisimsil/"+uyeId);
    }
}
