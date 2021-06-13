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
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'uye',
    component: UyeComponent
  },{
    path: 'urun',
    component: UrunComponent
  },{
    path: 'urunlistele/:uyeId',
    component: UrunListeComponent
  },
  {
    path: 'uyelistele/:urunId',
    component: UyeListeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
