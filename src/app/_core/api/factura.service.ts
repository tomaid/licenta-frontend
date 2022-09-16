import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {FacturaInfo, FacturaTabel} from "../model/Factura";
import {FacturaDetalii} from "../model/FacturaDetalii";
import {Chitanta} from "../model/Chitanta";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  generareFacturi(body: any, asocId:number) : Observable<any>{
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/factura/generare"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(repo, body, httpOptions).pipe(tap());
  }

  getFacturi(asocId:number): Observable<FacturaTabel[]> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/factura"}`;
    return this.http.get<FacturaTabel[]>(repo).pipe(tap());
  }

  getFactura(asocId:number,facturaId:number): Observable<FacturaInfo> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/factura/"}${facturaId}`;
    return this.http.get<FacturaInfo>(repo).pipe(tap());
  }
  getFacturaDetalii(asocId:number,facturaId:number): Observable<FacturaDetalii[]> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/factura/"}${facturaId}${"/detalii"}`;
    return this.http.get<FacturaDetalii[]>(repo).pipe(tap());
  }
  plataFactura(asocId:number,facturaId:number, body: any): Observable<any> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/factura/"}${facturaId}${"/plata"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
   return this.http.post<any>(repo, body, httpOptions).pipe(tap());
  }
  getChitante(asocId: number, facturaId: number): Observable<Chitanta[]> {
    const repo = `${this.baseUrl + "/asociatie/"}${asocId}${"/factura/"}${facturaId}${"/chitanta/all"}`;
    return this.http.get<Chitanta[]>(repo).pipe(tap());
  }
  getFacturiLocatar(apartamentId:number): Observable<FacturaTabel[]> {
    const repo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/factura"}`;
    return this.http.get<FacturaTabel[]>(repo).pipe(tap());
  }

  getFacturaLocatar(apartamentId:number,facturaId:number): Observable<FacturaInfo> {
    const repo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/factura/"}${facturaId}`;
    return this.http.get<FacturaInfo>(repo).pipe(tap());
  }
  getFacturaDetaliiLocatar(apartamentId:number,facturaId:number): Observable<FacturaDetalii[]> {
    const repo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/factura/"}${facturaId}${"/detalii"}`;
    return this.http.get<FacturaDetalii[]>(repo).pipe(tap());
  }
  plataFacturaLocatar(apartamentId:number,facturaId:number, body: any): Observable<any> {
    const repo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/factura/"}${facturaId}${"/plata"}`;
    console.log(repo);
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(repo, body, httpOptions).pipe(tap());
  }
  getChitanteLocatar(apartamentId: number, facturaId: number): Observable<Chitanta[]> {
    const repo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/factura/"}${facturaId}${"/chitanta/all"}`;
    return this.http.get<Chitanta[]>(repo).pipe(tap());
  }
}
