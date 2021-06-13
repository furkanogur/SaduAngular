import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  frmGroup: FormGroup;


  constructor(
    public servis: ApiService,
    public frmbuilder: FormBuilder
  ) {
    this.frmGroup = new FormGroup({
      KullaniciAdi: new FormControl(),
      Email: new FormControl(),
      Sifre: new FormControl()

    });
  }

  ngOnInit() {

  }
  OturumAc(email: string, parola: string) {
    this.servis.tokenAl(email, parola).subscribe((d: any) => {
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uyeId", d.uyeId);
      localStorage.setItem("uyeadi", d.uyeadi);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri);

      // if (localStorage.getItem("uyeYetkileri") == '["Admin"]') {
      //   location.href = ("/urunlistele");
      // }
      // else {
      //   location.href = ("/");
      // }
      location.href=("/");
    });
  }

  KayitOl(frmGroup) {
    var uye: Uye = new Uye();
    uye.KullaniciAdi = frmGroup.KullaniciAdi
    uye.Email = frmGroup.Email
    uye.Sifre = frmGroup.Sifre
    uye.admin = false
    uye.UyeFoto= "profil.jpg"
    if (uye) {
      this.servis.UyeEkle(uye).subscribe((s: Sonuc) => {
        console.log(s);
        this.OturumAc(uye.Email, uye.Sifre)
      });
    }
  }
}