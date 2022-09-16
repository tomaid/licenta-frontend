import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentificareService {
  token=localStorage.getItem('token');
  user?:string;
  constructor() {
  }
  isLoggedIn(){
    if(this.token){
      const payload = atob(this.token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      this.user=parsedPayload.user_name;

      if(parsedPayload.exp > Date.now() / 1000){
        return true;
      }
      else{
        localStorage.clear();
        return false;
      }
    }
    return false;
  }
  logout(){
    localStorage.clear();
    window.location.reload();
  }

}
