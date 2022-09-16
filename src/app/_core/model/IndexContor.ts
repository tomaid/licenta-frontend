export interface IndexContor{
  id:number,
  contorId: number,
  valoareIndex:number,
  dataCitire: Date,
  autocitit: boolean,
  consum: number
}
export class IndexContorForm{
  id:number;
  valoareIndex: number;

  constructor(id: number, valoareIndex: number) {
    this.id = id;
    this.valoareIndex = valoareIndex;
  }
}
