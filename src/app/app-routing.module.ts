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


const routes: Routes = [
  //herkes
  {
    path: '',
    component: HomeComponent
  },
  //admin
  {
    path: 'uye',
    component: UyeComponent
  },
  //admin
  {
    path: 'urun',
    component: UrunComponent
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
    component: KategorilerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
