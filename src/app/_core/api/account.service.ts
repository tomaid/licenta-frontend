import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {DateUser} from "../model/User";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseUrl: string = environment.server;
  private readonly tokenLink: string = environment.token;
  private body = new URLSearchParams();


  constructor(private http: HttpClient) { }

  inregistrare(body: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/user/create", body);
  }
  autentificare(data: any) : Observable<any>{
    this.body.delete('username');
    this.body.delete('password');
    this.body.append('username',data.username);
    this.body.append('password',data.password);
    this.body.append('grant_type','password');
    this.body.append('scope','web');
    this.body.append('client_id','angular');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Accept':'*/*',
        Authorization: 'Basic '+btoa("angular:")
      })
    };
    return this.http.post(this.tokenLink, this.body.toString(), httpOptions);
  }

  resetareParola(body: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/user/reset-parola", body);
  }

  actualizareParola(body: any): Observable<any>{
    return this.http.patch<any>(this.baseUrl + "/user/actualizare-parola", body);
  }
  actualizareDate(body: any): Observable<any>{
    return this.http.put<any>(this.baseUrl + "/user/actualizare-date", body);
  }
  getDate(): Observable<DateUser>{
    return this.http.get<DateUser>(this.baseUrl + "/user/actualizare-date").pipe(tap());
  }
}
