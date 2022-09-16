import {Role} from "./Role";
export interface DateUser{
   user: string,
   nume: string,
   prenume: string,
   telefon: string
}
export class User{
  constructor(public id:number,
              public user: string,
              public pass: string,
              public nume: string,
              public prenume: string,
              public telefon: string,
              public role: Role) {
  }
}

export class RegisterForm{
   user: string;
   pass: string;
   nume: string;
   prenume: string;
   telefon: string;
   role: Role;
  constructor( user: string,
               pass: string,
               nume: string,
               prenume: string,
               telefon: string,
               role: Role) {
    this.user=user;
    this.pass=pass;
    this.nume=nume;
    this.prenume=prenume;
    this.telefon=telefon;
    this.role= role;
  }
}
export class DetaliiForm{
  user: string;
  nume: string;
  prenume: string;
  telefon: string;
  constructor( user: string,
               nume: string,
               prenume: string,
               telefon: string) {
    this.user=user;
    this.nume=nume;
    this.prenume=prenume;
    this.telefon=telefon;
  }
}
export class ModficareParolaForm{
  parolaVeche: string;
  parolaNoua: string;
  constructor( parolaVeche: string,
               parolaNoua: string) {
    this.parolaVeche=parolaVeche;
    this.parolaNoua=parolaNoua;
  }
}
export class LoginForm{
  username: string;
  password: string;
  grant_type: string;
  scope: string;

  constructor( username: string,
               password: string) {
    this.username=username;
    this.password=password;
    this.grant_type="password";
    this.scope="web";
  }
}
export interface LoginResponse {
  token: string;
  user: User;
}
