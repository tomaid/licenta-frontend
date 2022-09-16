export interface Factura{
  id:number,
  apartamentNume:string,
  valoare: number,
  data: Date,
  status: string
}
export interface FacturaInfo{
  id:number,
  apartamentNume:string,
  apartamentNumar:string,
  valoare: number,
  valoareRestante: number,
  valoareAchitata: number,
  dataIntocmire: Date,
  dataScadenta: Date,
  luna: number,
  anul:number
}
export interface FacturaVizualizare{
  id:number,
  apartamentNume:string,
  valoare: number,
  data: Date,
  status: string
}
export interface FacturaPlata{
  id:number,
  valoare: number,
}
export class FacturaPlataForm{
  id:number;
  valoare: number;
  metoda:number;

  constructor(id: number, valoare: number, metoda: number) {
    this.id = id;
    this.valoare = valoare;
    this.metoda = metoda;
  }
}
export class FacturaPlataApartamentForm{
card:string;
lunaExpirare: number;
anExpirare:number;
cvx:number;
valoare: number;


  constructor(card: string, lunaExpirare: number, anExpirare: number, cvx: number, valoare: number) {
    this.card = card;
    this.lunaExpirare = lunaExpirare;
    this.anExpirare = anExpirare;
    this.cvx = cvx;
    this.valoare = valoare;
  }
}
export interface FacturaTabel{
  id:number,
  apartamentNume:string,
  valoare: number,
  data: Date,
  dataScadenta: Date,
  valoareRestante: number;
  status: string
}
export interface Calcul{
  id:number,
  nume:string
}

export class FacturaForm{
 method:number;
 luna:number;
 an:number;


  constructor(method: number, luna: number, an: number) {
    this.method = method;
    this.luna = luna;
    this.an = an;
  }
}
