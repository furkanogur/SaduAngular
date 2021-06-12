import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { UyeListeComponent } from './components/uyeListe/uyeListe.component';
import { UrunfotoDialogComponent } from './components/dialogs/urunfoto-dialog/urunfoto-dialog.component';
import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { IletisimDialogComponent } from './components/dialogs/iletisim-dialog/iletisim-dialog.component';
import { TedarikDialogComponent } from './components/dialogs/tedarik-dialog/tedarik-dialog.component';
import { UrunComponent } from './components/Urun/Urun.component';
import { UyeComponent } from './components/Uye/Uye.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { UrunListeComponent } from './components/urunListe/urunListe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeComponent,
    UrunComponent,
    UrunListeComponent,
    UyeListeComponent,


    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    TedarikDialogComponent,
    IletisimDialogComponent,
    FotoyukleDialogComponent,
    UrunfotoDialogComponent,
    UrunDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    TedarikDialogComponent,
    IletisimDialogComponent,
    IletisimDialogComponent,
    UrunfotoDialogComponent,
    UrunDialogComponent


  ],
  providers: [MyAlertService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
