export interface Apartament{
  id:number,
  numar:string,
  suprafataMp: number,
  numarLocatari: number,
  asociatieId:number,
  userId: number,
  nume:string,
  prenume:string,
  telefon:string,
  email:string,
  strada: string
}
export class ApartamentForm{
  numar:string;
  suprafataMp: number;
  numarLocatari: number;
  nume:string;
  prenume:string;
  telefon:string;
  email:string;

  constructor(numar: string, suprafataMp: number, numarLocatari: number, nume: string, prenume: string, telefon: string, email: string) {
    this.numar = numar;
    this.suprafataMp = suprafataMp;
    this.numarLocatari = numarLocatari;
    this.nume = nume;
    this.prenume = prenume;
    this.telefon = telefon;
    this.email = email;
  }
}
