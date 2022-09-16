import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsociatieidService {
  private actualizareAsociatieId : BehaviorSubject<string> = new BehaviorSubject<string>('');
  asociatieId: Observable<string> = this.actualizareAsociatieId.asObservable();
  constructor() { }

  setAsociatie(asociatieId: string) {
    this.actualizareAsociatieId.next(asociatieId);
  }
}
