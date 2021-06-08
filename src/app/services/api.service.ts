import { Urunler } from './../models/Urunler';
import { Uye } from './../models/Uye';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44384/api/";

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
}
