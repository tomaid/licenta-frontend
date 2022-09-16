import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Avizier} from "../model/Avizier";
import {Observable, tap} from "rxjs";
import {Obj} from "@popperjs/core";
import {Cheltuiala} from "../model/Cheltuiala";
import {ServiciuAvizier} from "../model/Serviciu";

@Injectable({
  providedIn: 'root'
})
export class AvizierService {

  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  getAvizier(asocId: number, anul: number, luna: number): Observable<Object[]> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/avizier/an/"}${anul}${"/luna/"}${luna}`;
    return this.http.get<Object[]>(repo).pipe(tap());
  }
  getServicii(asocId: number, anul: number, luna: number): Observable<ServiciuAvizier[]> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/avizier/an/"}${anul}${"/luna/"}${luna}${"/servicii"}`;
    return this.http.get<ServiciuAvizier[]>(repo).pipe(tap());
  }
  getCheltuieli(asocId: number, anul: number, luna: number): Observable<Cheltuiala[]> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/avizier/an/"}${anul}${"/luna/"}${luna}${"/cheltuieli"}`;
    return this.http.get<Cheltuiala[]>(repo).pipe(tap());
  }
  getAvizierPtLocatar(aptId: number, anul: number, luna: number): Observable<Object[]> {
    const repo = `${this.baseUrl + "/apartament/"}${aptId}${"/avizier/an/"}${anul}${"/luna/"}${luna}`;
    return this.http.get<Object[]>(repo).pipe(tap());
  }
  getServiciiPtLocatar(aptId: number, anul: number, luna: number): Observable<ServiciuAvizier[]> {
    const repo = `${this.baseUrl + "/apartament/"}${aptId}${"/avizier/an/"}${anul}${"/luna/"}${luna}${"/servicii"}`;
    return this.http.get<ServiciuAvizier[]>(repo).pipe(tap());
  }
  getCheltuieliPtLocatar(aptId: number, anul: number, luna: number): Observable<Cheltuiala[]> {
    const repo = `${this.baseUrl + "/apartament/"}${aptId}${"/avizier/an/"}${anul}${"/luna/"}${luna}${"/cheltuieli"}`;
    return this.http.get<Cheltuiala[]>(repo).pipe(tap());
  }
}
