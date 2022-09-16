import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Apartament} from "../model/Apartament";

@Injectable({
  providedIn: 'root'
})
export class ApartamenteService {
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  creareApartament(body: any, asocId:number) : Observable<any>{
    const apartamentRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/apartament/creare"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(apartamentRepo, body, httpOptions).pipe(tap());
  }
  getApartamente(asocId:number): Observable<Apartament[]> {
    const apartamentRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/apartament"}`;
    return this.http.get<Apartament[]>(apartamentRepo).pipe(tap());
  }
  getApartamenteByLocatar(): Observable<Apartament[]> {
    const apartamentRepo = `${this.baseUrl + "/locatar/apartament"}`;
    return this.http.get<Apartament[]>(apartamentRepo).pipe(tap());
  }
  getApartament(apartamentId:number): Observable<Apartament> {
    const apartamentRepo = `${this.baseUrl + "/locatar/apartament/"}${apartamentId}`;
    return this.http.get<Apartament>(apartamentRepo).pipe(tap());
  }

  actualizareApartament(body: any, apartamentId:number, asocId:number): Observable<any>{
    const apartamentRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/apartament/"}${apartamentId}`;
    return this.http.patch<any>(apartamentRepo, body);
  }
  stergeApartament(apartamentId:number, asocId:number): Observable<any>{
    const apartamentRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/apartament/"}${apartamentId}`;
    return this.http.delete<any>(apartamentRepo);
  }
}
