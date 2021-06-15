import { SdurumOdemeKargoComponent } from './components/sdurum-odeme-kargo/sdurum-odeme-kargo.component';
import { AdminSiparislerComponent } from './components/admin-siparisler/admin-siparisler.component';
import { SiparisComponent } from './components/Siparis/Siparis.component';
import { UrunAraComponent } from './components/urunAra/urunAra.component';
import { KategoriListeleComponent } from './components/KategoriListele/KategoriListele.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { HesabimComponent } from './components/hesabim/hesabim.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UyeListeComponent } from './components/uyeListe/uyeListe.component';
import { UyeComponent } from './components/Uye/Uye.component';
import { UrunComponent } from './components/Urun/Urun.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrunListeComponent } from './components/urunListe/urunListe.component';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  //herkes
  {
    path: '',
    component: HomeComponent
  },
  //admin
  {
    path: 'uye',
    component: UyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/"
    }
  },
  //admin
  {
    path: 'urun',
    component: UrunComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/"
    }
  },
  //herkes
  {
    path: 'urunlistele/:uyeId',
    component: UrunListeComponent
  },
  //herkes
  {
    path: 'uyelistele/:urunId',
    component: UyeListeComponent
  },
  //herkes
  {
    path: 'kategorilistele/:katId/:KatAdi',
    component: KategoriListeleComponent
  },
  //herkes
  {
    path: 'siparis/:urunId',
    component: SiparisComponent
  },
  //herkes
  {
    path: 'urunAra/:katId',
    component: UrunAraComponent
  },
  //herkes
  {
    path: 'login',
    component: LoginComponent
  },
  //herkes
  {
    path: 'register',
    component: RegisterComponent
  },
  //herkes
  {
    path: 'hesabim',
    component: HesabimComponent
  },
  //admin
  {
    path: 'kategoriler',
    component: KategorilerComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/"
    }
  },
  //admin
  {
    path: 'admsiparis',
    component: AdminSiparislerComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/"
    }
  },
  //admin
  {
    path: 'sdurumodemekargo',
    component: SdurumOdemeKargoComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/"
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
