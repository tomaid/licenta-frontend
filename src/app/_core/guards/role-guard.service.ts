import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {RoleService} from "../services/role.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private roleService: RoleService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
    if(!this.roleService.isAdmin()){
      this.router.navigate(['locatar']);
      return false;
    }
    return true;

  }
}
