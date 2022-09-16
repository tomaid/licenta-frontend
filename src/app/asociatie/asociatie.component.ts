import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, Observable, shareReplay} from "rxjs";
import {AsociatieidService} from "../_core/services/asociatieid.service";
import {Router} from "@angular/router";
import {AsocCookieIdService} from "../_core/services/asoc-cookie-id.service";
import {NotifierService} from "../_core/services/notifier.service";

@Component({
  selector: 'app-asociatie',
  templateUrl: './asociatie.component.html',
  styleUrls: ['./asociatie.component.css']
})
export class AsociatieComponent implements OnInit {
  anul:number=new Date().getFullYear();
  luna:number =new Date().getMonth()+1;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private asocCookieIdService: AsocCookieIdService,
              private notifierService: NotifierService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.asocCookieIdService.asocId!=null)this.router.navigate(['asociatie/avizier/an/', this.anul, 'luna', this.luna]);
  }
}
