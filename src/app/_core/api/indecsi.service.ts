import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IndexContor} from "../model/IndexContor";
import {ContorIndex, ContorIndexExtend} from "../model/Contor";

@Injectable({
  providedIn: 'root'
})
export class IndecsiService {
  private readonly baseUrl: string = environment.server;
  constructor(private http: HttpClient) { }
  salvareIndex(body: any, asocId:number, apartamentId:number, servId:number, contorId:number) : Observable<any>{
    const indexRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/apartament/"}${apartamentId}${"/serviciu/"}${servId}${"/contor/"}${contorId}${"/index"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(indexRepo, body, httpOptions).pipe(tap());
  }
  salvareIndexLocatar(body: any, apartamentId:number, servId:number, contorId:number) : Observable<any>{
    const indexRepo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/serviciu/"}${servId}${"/contor/"}${contorId}${"/index"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(indexRepo, body, httpOptions).pipe(tap());
  }
  salvareIndexGeneral(body: any, asocId:number,servId:number, contorId:number) : Observable<any>{
    const indexRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${servId}${"/contor/"}${contorId}${"/general"}`;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(indexRepo, body, httpOptions).pipe(tap());
  }
  getContoare(asocId:number, servId:number, contorId:number): Observable<IndexContor[]> {
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${servId}${"/contor/"}${contorId}${"/index"}`;
    return this.http.get<IndexContor[]>(contorRepo).pipe(tap());
  }
  getIndecsi(asocId:number, apartamentId:number): Observable<ContorIndex[]> {
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/apartament/"}${apartamentId}${"/indecsi/"}`;
    return this.http.get<ContorIndex[]>(contorRepo).pipe(tap());
  }
  getContoareLocatar(apartamentId:number, servId:number, contorId:number): Observable<IndexContor[]> {
    const contorRepo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/serviciu/"}${servId}${"/contor/"}${contorId}${"/indexAll"}`;
    return this.http.get<IndexContor[]>(contorRepo).pipe(tap());
  }
  getIndecsiLocatar(apartamentId:number): Observable<ContorIndexExtend[]> {
    const contorRepo = `${this.baseUrl + "/apartament/"}${apartamentId}${"/indecsi/"}`;
    return this.http.get<ContorIndexExtend[]>(contorRepo).pipe(tap());
  }
  getContorGeneral(asocId:number, serviciuId:number): Observable<ContorIndex> {
    const contorRepo = `${this.baseUrl + "/asociatie/"}${asocId}${"/serviciu/"}${serviciuId}${"/contorl-general"}`;
    return this.http.get<ContorIndex>(contorRepo).pipe(tap());
  }
}
