import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Uye } from 'src/app/Models/Uye';
import { EvKiralamaServisService } from 'src/app/Services/EvKiralamaServis.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  admin: boolean = false;
  uyeId: any;
  uye: Uye;
  uyevar: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public router: Router,public servis: EvKiralamaServisService) { }

  ngOnInit() {
    if (localStorage.getItem("yetki") == "A") {
      this.admin = true;
    }
    else {
      this.admin = false
    }
    this.uyeId = localStorage.getItem("uid");
    this.servis.uyebyid(this.uyeId).subscribe((d: Uye) => {
      this.uye = d
    })
    console.log(this.uye)
    if(localStorage.get("uid")){
      this.uyevar = true
    }
    else{
      this.uyevar = false
    }
  }

  CikisYap() {
    localStorage.removeItem("uid")
    localStorage.removeItem("yetki")
    this.router.navigate([""])
  }

}
