import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Asociatie, AsociatieFactura, AsociatieForm} from "../model/Asociatie";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsociatieService {
  private readonly baseUrl: string = environment.server;
  private readonly tokenLink: string = environment.token;
  private asociatiiRepo = this.baseUrl + "/asociatie/getAll";
  private asociatieInregistrare = this.baseUrl + "/asociatie/create";

  constructor(private http: HttpClient) { }

  getAsociatii(): Observable<Asociatie[]> {
    return this.http.get<Asociatie[]>(this.asociatiiRepo).pipe(tap(
      _=> {}
    ))
  }
  inregistrareAsociatie(body: any) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      // responseType: 'text' as const
    };
    return this.http.post<any>(this.asociatieInregistrare, body, httpOptions).pipe(tap(
    ));
  }

  getAsociatie(id:number): Observable<Asociatie>{
    const asociatieRepo = `${this.baseUrl + "/asociatie"}/${id}`;
    return this.http.get<Asociatie>(asociatieRepo).pipe(tap());
  }
  getAsociatieFactura(id:number): Observable<AsociatieFactura>{
    const asociatieRepo = `${this.baseUrl + "/asociatie"}/${id}/date-factura`;
    return this.http.get<AsociatieFactura>(asociatieRepo).pipe(tap());
  }
  getAsociatieFacturaforLocatar(id:number): Observable<AsociatieFactura>{
    const asociatieRepo = `${this.baseUrl + "/apartament"}/${id}/date-factura`;
    return this.http.get<AsociatieFactura>(asociatieRepo).pipe(tap());
  }

  actualizareAsociatie(body: any, id:number): Observable<any>{
    const asociatieRepo = `${this.baseUrl + "/asociatie"}/${id}`;
    return this.http.patch<any>(asociatieRepo, body);
  }
}
