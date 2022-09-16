import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AutentificareService} from "../services/autentificare.service";
import {RoleService} from "../services/role.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate{

  constructor(private autentificareServices: AutentificareService, private router: Router, private roleService: RoleService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.autentificareServices.isLoggedIn()){
      (this.roleService.isAdmin()) ? this.router.navigate(['asociatie']) : this.router.navigate(['locatar']);
      return false;
    }

    return true;
  }
}
