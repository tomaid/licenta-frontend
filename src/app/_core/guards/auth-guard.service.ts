import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AutentificareService} from "../services/autentificare.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private autentificareServices: AutentificareService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{

    if(!this.autentificareServices.isLoggedIn()){
      this.router.navigate(['autentificare']);
      return false;
    }

    return true;

  }
}
