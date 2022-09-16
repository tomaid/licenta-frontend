import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {Calcul, Cheltuiala} from "../model/Cheltuiala";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Apartament} from "../model/Apartament";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheltuialaService {
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  creareCheltuiala(body: any, asocId:number) : Observable<any>{
    const cheltuialaRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/cheltuiala/introducere"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(cheltuialaRepo, body, httpOptions).pipe(tap());
  }
  getCheltuieli(asocId:number): Observable<Cheltuiala[]> {
    const cheltuialaRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/cheltuiala"}`;
    return this.http.get<Cheltuiala[]>(cheltuialaRepo).pipe(tap());
  }
  getCheltuiala(asocId:number,cheltuialaId:number): Observable<Apartament> {
    const cheltuialaRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/cheltuiala/"}${cheltuialaId}`;
    return this.http.get<Apartament>(cheltuialaRepo).pipe(tap());
  }

  actualizareCheltuiala(body: any, cheltuialaId:number, asocId:number): Observable<any>{
    const cheltuialaRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/cheltuiala/"}${cheltuialaId}`;
    return this.http.patch<any>(cheltuialaRepo, body);
  }
  stergeCheltuiala(cheltuialaId:number, asocId:number): Observable<any>{
    const cheltuialaRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/cheltuiala/"}${cheltuialaId}`;
    return this.http.delete<any>(cheltuialaRepo);
  }
  formulaCalcul(asocId:number): Observable<Calcul[]> {
    const cheltuialaRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/cheltuiala/formula"}`;
    return this.http.get<Calcul[]>(cheltuialaRepo).pipe(tap());
  }
}
