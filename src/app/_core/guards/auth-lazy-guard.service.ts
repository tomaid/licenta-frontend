import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AutentificareService} from "../services/autentificare.service";

@Injectable({
  providedIn: 'root'
})
export class AuthLazyGuardService implements CanLoad{

  constructor(private router: Router, private autentificareServices: AutentificareService,) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.autentificareServices.isLoggedIn()){
      this.router.navigate(['autentificare']);
      return false;
    }

    return true;
  }
}
