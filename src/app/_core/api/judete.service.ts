import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Judet} from "../model/Judet";

@Injectable({
  providedIn: 'root'
})
export class JudeteService {
  private readonly baseUrl: string = environment.server;
  private judeteRepo = this.baseUrl + "/judete/getAll";
  constructor(private http: HttpClient) { }
  getJudete(): Observable<Judet[]> {
    return this.http.get<Judet[]>(this.judeteRepo).pipe(tap(
      _=> {}
    ))
  }
}
