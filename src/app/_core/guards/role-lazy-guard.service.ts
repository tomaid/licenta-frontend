import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {RoleService} from "../services/role.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleLazyGuardService implements CanLoad{

  constructor(private roleService: RoleService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.roleService.isAdmin()){
      this.router.navigate(['locatar']);
      return false;
    }
    return true;

  }
}
