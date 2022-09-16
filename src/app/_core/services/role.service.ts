import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  token=localStorage.getItem('token');
  role=localStorage.getItem('paginaStart');
  constructor() {
  }
  isAdmin(){
    if(this.token){
      const payload = atob(this.token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      if((parsedPayload.authorities[0]==="ADMIN")|| (this.role=="1")) return true;
    }

   //   if(this.role=="1") return true;

    return false;
  }
  isAdminNavigate(){
    window.location.reload();
  }
}
