import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dialogref:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public alert:MyAlertService,
    public matDialog:MatDialog
    ) { }
  

  ngOnInit() {
  }

  AlertAc(p:boolean){
    var s:Sonuc= new Sonuc();
    s.islem =p;
    s.mesaj="Alert Test Mesajı";
    this.alert.AlertUygula(s)
  }

  ConfirmAc(){
this.dialogref=this.matDialog.open(ConfirmDialogComponent,{
  width:'400px'
});
this.dialogref.componentInstance.dialogMesaj="Kayıt Silinecektir Onaylıyor musunuz?";

this.dialogref.afterClosed().subscribe(d=>{
  console.log(d)
  if(d){
    //silme rutine
  }
})
  }
}
