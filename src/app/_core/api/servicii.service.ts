import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Serviciu} from "../model/Serviciu";

@Injectable({
  providedIn: 'root'
})
export class ServiciiService {
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  creareSerivicu(body: any) : Observable<any>{
    const serviciuRepo = `${this.baseUrl + "/asociatie/servicii/creare"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(serviciuRepo, body, httpOptions).pipe(tap());
  }
  getServicii(asocId:number): Observable<Serviciu[]> {
    const serviciuRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/servicii"}`;
    return this.http.get<Serviciu[]>(serviciuRepo).pipe(tap());
  }
  getServiciu(asocId:number,servId:number): Observable<Serviciu> {
    const serviciuRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/servicii/"}${servId}`;
    return this.http.get<Serviciu>(serviciuRepo).pipe(tap());
  }

  actualizareSeriviciu(body: any, servId:number, asocId:number): Observable<any>{
    const serviciuRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${servId}`;
    return this.http.patch<any>(serviciuRepo, body);
  }
  stergeSeriviciu(servId:number, asocId:number): Observable<any>{
    const serviciuRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${servId}`;
    return this.http.delete<any>(serviciuRepo);
  }
}
