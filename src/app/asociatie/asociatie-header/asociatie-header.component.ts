import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Asociatie} from "../../_core/model/Asociatie";
import {AsociatieService} from "../../_core/api/asociatie.service";
import {AutentificareService} from "../../_core/services/autentificare.service";
import {AsocCookieIdService} from "../../_core/services/asoc-cookie-id.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-asociatie-header',
  templateUrl: './asociatie-header.component.html',
  styleUrls: ['./asociatie-header.component.css'],
})
export class AsociatieHeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );

  asociatii: Asociatie[] = [];
  selected: number = 0;
  showMenu:boolean = false;
  constructor(private breakpointObserver: BreakpointObserver,
              private asociatieService: AsociatieService,
              private autentificareService: AutentificareService,
              private asocCookieIdService: AsocCookieIdService,
              private router: Router) {}

  ngOnInit(): void {
    this.startSubscription();
  }
  startSubscription(){
    this.asociatieService.getAsociatii().subscribe((data: Asociatie[])=>{
        this.asociatii= data.sort((a,b) => a.id - b.id);
      },
      error => {
        this.logout();
      },
      ()=> {
        if (!this.asocCookieIdService.asocId) {
          if (this.asociatii.length <= 0) {
            this.router.navigate(['/asociatie/creare-asociatie']);
          } else {
            this.selected = this.asociatii[0].id;
            this.onSelectChange();
          }

        }
      }
    );
    (!this.asocCookieIdService.asocId) ?this.modificaAsociatieId(0) : this.modificaAsociatieId(Number(this.asocCookieIdService.asocId));
  }
  modificaAsociatieId(asociatieId:number){
    this.asocCookieIdService.setAsocId(asociatieId.toString());
    this.selected = asociatieId;
    if(asociatieId!=0)
      this.showMenu=true;
  }

  logout(){
    this.autentificareService.logout();
  }

  onSelectChange() {
    this.modificaAsociatieId(this.selected);
    window.location.reload();

  }
}
