import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Uye } from 'src/app/Models/Uye';
import { UyeFoto } from 'src/app/Models/UyeFoto';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';

@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.scss']
})
export class FotoyukleDialogComponent implements OnInit {

  secFoto!: any;
  uyeFoto: UyeFoto = new UyeFoto();
  secUye!: Uye;
  constructor(
    public fotoDialogRef: MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: EvKiralamaServisService
  ) { }

  ngOnInit() {
  }


  FotoSec(e: any) {
    var fotolar = e.target.files;
    var foto = fotolar[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secFoto = fr.result; // base64 formatında fotoğraf dialog da göstermek için 
      this.uyeFoto.fotoData = fr.result?.toString(); // base64 formatında fotoğrafı veritabanına kaydetmek için
      this.uyeFoto.fotoUzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }
}
