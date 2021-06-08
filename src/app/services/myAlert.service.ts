import { Sonuc } from './../models/Sonuc';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  public dialogRef: MatDialogRef<AlertDialogComponent>;
  constructor(
    public matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "İşlem Tamam";
    } else {
      baslik = "Hata";
    }

    this.dialogRef = this.matDialog.open(AlertDialogComponent, {
      width: '300px'
    });
    this.dialogRef.componentInstance.dialogBaslik = baslik;
    this.dialogRef.componentInstance.dialogMesaj = s.mesaj;
    this.dialogRef.componentInstance.dialogIslem = s.islem;

    this.dialogRef.afterClosed().subscribe(d => {
      this.dialogRef = null;
    });
  }

}
