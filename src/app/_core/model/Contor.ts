export interface Contor{
  id:number,
  nume:string,
  idApartament: number,
  numeApartament: string,
  general: boolean;
}
export class ContorForm{
  nume:string;
  idApartament: number;
  tip: number;

  constructor(nume: string, idApartament: number, tip:number) {
    this.nume = nume;
    this.idApartament = idApartament;
    this.tip=tip;
  }
}
export interface ContorIndex{
  id:number,
  numeServiciu:string,
  idServiciu: number,
  numeContor: string,
  ultimulIndex: number,
  indexCurent: number;
}
export interface ContorIndexExtend extends ContorIndex{
  autoCitit:boolean;
}
