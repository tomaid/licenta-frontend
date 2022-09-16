import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  token=localStorage.getItem('token');
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.token){
      req=req.clone({
        setHeaders:{
          Authorization: `Bearer ${this.token}`,
          ContentType: 'application/json',
        }
      })
    }
    else{
      req=req.clone({
        setHeaders:{
          ContentType: 'application/json',
        }
      })
    }
    return next.handle(req);
  }
}
