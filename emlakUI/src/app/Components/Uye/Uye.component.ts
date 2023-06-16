//import { FotoyukleDialogComponent } from './../Dialogs/fotoyukle-dialog/fotoyukle-dialog.component';//
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Uye } from 'src/app/Models/Uye';
//import { Sonuc } from 'src/app/Models/Sonuc';//
import { UyeDialogComponent } from '../Dialogs/uye-dialog/uye-dialog.component';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';
import { Sonuc } from 'src/app/Models/sonuc';
import { FotoyukleDialogComponent } from '../Dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { UyeFoto } from 'src/app/Models/UyeFoto';

@Component({
  selector: 'app-Uye',
  templateUrl: './Uye.component.html',
  styleUrls: ['./Uye.component.scss']
})
export class UyeComponent implements OnInit {

  displayedColumns: string[] = ['uyeFoto', 'uyeAd', 'uyeSoyad', 'uyeTel', 'uyeMail', 'uyeParola', 'uyeYetki', 'Duzenle', 'Sil'];
  dataSource: any;

  uyedialogref: MatDialogRef<UyeDialogComponent>
  fotodialogref: MatDialogRef<FotoyukleDialogComponent>
  uye: Uye;

  constructor(public service: EvKiralamaServisService, public matdialog: MatDialog, public toastr: ToastrService) {

  }

  ngOnInit() {
    this.uyeliste();
  }

  uyeliste() {
    this.service.uyeliste().subscribe((veri: Uye[]) => {
      this.dataSource = new MatTableDataSource(veri);
    })
  }


  uyeekle() {
    this.uye = new Uye();
    this.uyedialogref = this.matdialog.open(UyeDialogComponent, {
      width: "300px",
      data: {
        kayit: this.uye,
        islem: "ekle"
      }
    })

    this.uyedialogref.afterClosed().subscribe((veri: Uye) => {
      if (veri) {
        this.service.uyeekle(veri).subscribe((sonuc: Sonuc) => {
          if (sonuc.Islem == true) {
            this.toastr.success(sonuc.Mesaj);
            this.uyeliste()
          } else {
            this.toastr.success(sonuc.Mesaj);
            this.uyeliste()
          }
        })
      }
    })

  }


  uyeduzenle(kayit: Uye) {
    this.uyedialogref = this.matdialog.open(UyeDialogComponent, {
      width: "300px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })

    this.uyedialogref.afterClosed().subscribe(d => {
      if (d) {

        kayit.uyeAd = d.uyeAd;
        kayit.uyeSoyad = d.uyeSoyad;
        kayit.uyeTel = d.uyeTel;
        kayit.uyeMail = d.uyeMail;
        kayit.uyeParola = d.uyeParola;
        kayit.uyeYetki = d.uyeYetki;
        console.log(kayit)

        this.service.uyeduzenle(kayit).subscribe((s: Sonuc) => {
          this.dataSource.AlertUygula(s);
          if (s.Islem) {
            this.uyeliste();
          }
          else {
            this.uyeliste();

          }
        })
      }
    });
  }
  uyesil(uyeid) {
    this.service.uyesil(uyeid).subscribe((sonuc: Sonuc) => {
      this.toastr.success(sonuc.Mesaj);
      this.uyeliste();
    })

  }
  FotoGuncelle(uye: Uye) {
    console.log(uye)
    this.fotodialogref = this.matdialog.open(FotoyukleDialogComponent, {
      width: '400px',
      data: uye
    });
    this.fotodialogref.afterClosed().subscribe((d: UyeFoto) => {
      d.UyeId = uye.uyeId;
      this.service.UyeFotoGuncelle(d).subscribe ((s: Sonuc) => {
        s.Islem ? this.uyeliste() : null;
      })
    })
  }

  // FotoGuncelle(kayit: Haber) {
  //   this.fotoDialogRef = this.matDialog.open(FotoYukleDialogComponent, {
  //     width: "600px",
  //     data: kayit
  //   });
  //   this.fotoDialogRef.afterClosed().subscribe((d: HaberFoto) => {
  //     d.haberId = kayit.HaberId;
  //     this.apiServis.HaberFotoGuncelle(d).subscribe ((s: Sonuc) =>{
  //       this.alertServis.AlertUygula(s)
  //       s.Islem ? this.HaberListele() : null;
  //     })
  //   })
  // }
}