import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Judet} from "../model/Judet";
import {Localitate} from "../model/Localitate";

@Injectable({
  providedIn: 'root'
})
export class LocalitatiService {
  private readonly baseUrl: string = environment.server;
  private localitatiRepo = this.baseUrl + "/localitati/dinJudet/";
  constructor(private http: HttpClient) { }
  getLocalitati(judetId: number): Observable<Localitate[]> {
    return this.http.get<Localitate[]>(this.localitatiRepo + judetId ).pipe(tap(
      _=> {}
    ))
  }
}
