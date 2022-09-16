export interface Cheltuiala{
  id:number,
  nume_cheltuiala:string,
  calcul_id: number,
  calcul_nume: string,
  data_introducere: Date,
  suma: number,
  numar_factura:number,
  serie_factura: string
}
export interface Calcul{
  id:number,
  nume:string
}

export class CheltuialaForm{
  nume_cheltuiala:string;
  data_introducere: Date;
  suma: number;
  calcul_id: number;
  numar_factura:number;
  serie_factura: string;

  constructor(nume_cheltuiala: string, calcul_id: number, data_introducere: Date, suma: number, numar_factura: number, serie_factura: string) {
   this.calcul_id = calcul_id;
    this.nume_cheltuiala = nume_cheltuiala;
    this.data_introducere = data_introducere;
    this.suma = suma;
    this.numar_factura = numar_factura;
    this.serie_factura = serie_factura;
  }
}
