import { Component, OnInit } from '@angular/core';
import {map, Observable, shareReplay, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AsociatieService} from "../../_core/api/asociatie.service";
import {AutentificareService} from "../../_core/services/autentificare.service";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Apartament} from "../../_core/model/Apartament";
import {ApartamenteService} from "../../_core/api/apartamente.service";
import {UpperLowerTitleCaseService} from "../../_shared/upper-lower-title-case.service";

@Component({
  selector: 'app-locatar-header',
  templateUrl: './locatar-header.component.html',
  styleUrls: ['./locatar-header.component.css']
})
export class LocatarHeaderComponent implements OnInit {
  token=localStorage.getItem('token');

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  title!:string;
  apartamentId:number = -1;
  apartamente: Apartament[] = [];
  showMenu:boolean = false;
  private routeSub!: Subscription;
  constructor(private breakpointObserver: BreakpointObserver,
              private apartamenteService: ApartamenteService,
              private autentificareService: AutentificareService,
              private asocCookieIdService: AsocCookieIdService,
              public upperLowerTitleCaseService: UpperLowerTitleCaseService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['id']!=null) this.apartamentId = params['id'];
    });
    this.startSubscription();
    if(this.apartamentId>0){
      this.showMenu=true;
    }
  }
  startSubscription(){
    this.apartamenteService.getApartamenteByLocatar().subscribe((data: Apartament[])=>{
        this.apartamente= data.sort((a,b) => a.id - b.id);
      },
      error => {
        this.logout();
      },
      ()=> {
        for (let i = 0; i < this.apartamente.length; i++) {
          if(this.apartamente[i].id==this.apartamentId){
            this.title = this.upperLowerTitleCaseService.titleCase(this.apartamente[i].strada) + " " +
              this.upperLowerTitleCaseService.upperCase(this.apartamente[i].numar);
          }
        }
          if (this.apartamente.length > 0) {
            if(this.apartamentId<0){
              this.apartamentId = this.apartamente[0].id;
              this.onSelectChange();
            }

          }
      }
    );
  }

  logout(){
    this.autentificareService.logout();
  }

  onSelectChange() {
   window.location.replace('/locatar/apartament/'+ this.apartamentId + "/avizier");
  }


  ajutor() {
   this.router.navigate(['locatar','apartament',this.apartamentId,'ajutor']);
//    window.location.replace('/locatar/apartament/' + this.apartamentId + '/ajutor');
  }
}
