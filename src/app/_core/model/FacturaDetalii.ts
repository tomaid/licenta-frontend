export interface FacturaDetalii{
  id: number,
  detalii:string,
  valoare: number
}
export class FacturaDetaliiForm{
  id:number;
  valoareIndex: number;

  constructor(id: number, valoareIndex: number) {
    this.id = id;
    this.valoareIndex = valoareIndex;
  }
}
