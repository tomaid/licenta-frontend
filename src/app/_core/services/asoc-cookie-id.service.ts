import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsocCookieIdService {
  asocId=localStorage.getItem('asocId');
  constructor() {
  }

  setAsocId(id: string){
    localStorage.setItem('asocId', id);
  }

  delAsocId(){
    localStorage.removeItem('asocId');
  }

}
