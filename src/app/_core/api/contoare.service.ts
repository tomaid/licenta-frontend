import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, tap} from "rxjs";
import {Contor} from "../model/Contor";

@Injectable({
  providedIn: 'root'
})
export class ContoareService {
  private readonly baseUrl: string = environment.server;
  constructor(private http: HttpClient) { }
  creareContor(body: any, asocId:number, serviciuId:number) : Observable<any>{
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${serviciuId}${"/contor/creare"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(contorRepo, body, httpOptions).pipe(tap());
  }
  getContoare(asocId:number,serviciuId:number): Observable<Contor[]> {
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${serviciuId}${"/contor/all"}`;
    return this.http.get<Contor[]>(contorRepo).pipe(tap());
  }
  getContor(asocId:number,serviciuId:number, contorId:number): Observable<Contor> {
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${serviciuId}${"/contor/"}${contorId}`;
    return this.http.get<Contor>(contorRepo).pipe(tap());
  }
  actualizareContor(body: any, asocId:number,serviciuId:number, contorId:number): Observable<any>{
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${serviciuId}${"/contor/"}${contorId}`;
    return this.http.patch<any>(contorRepo, body);
  }
  stergeContor(asocId:number,serviciuId:number, contorId:number): Observable<any>{
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${serviciuId}${"/contor/"}${contorId}`;
    return this.http.delete<any>(contorRepo);
  }
}
