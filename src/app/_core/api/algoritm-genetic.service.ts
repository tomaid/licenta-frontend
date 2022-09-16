import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ListaProdusePrimiteDeLaAlgoritm, ProdusArray} from "../model/Categorie";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlgoritmGeneticService {
  private readonly baseUrl: string = environment.server;

  constructor(private http: HttpClient) { }

  getProduse(body:ProdusArray): Observable<ListaProdusePrimiteDeLaAlgoritm[]> {
    const repo = `${this.baseUrl + "/algorim-genetic"}`;
    return this.http.post<ListaProdusePrimiteDeLaAlgoritm[]>(repo,body).pipe(tap());
  }
}
