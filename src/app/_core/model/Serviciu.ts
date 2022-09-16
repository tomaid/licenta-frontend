export interface Serviciu{
id:number,
  nume: string,
  pret: number,
  asociatie_id: number,
}
export interface ServiciuAvizier{
  id:number,
  Nume: string,
  pret: number,
  consumLunar:number
}

export class CreareServiciuForm{
  nume: string;
  pret: number;
  asociatie_id: number;

  constructor(nume: string, pret: number, asociatie_id: number) {
    this.nume = nume;
    this.pret = pret;
    this.asociatie_id=asociatie_id;
  }
}
export class ModificareServiciuForm{
  id: number;
  nume: string;
  pret: number;
  asociatie_id: number;

  constructor(id: number, nume: string, pret: number, asociatie_id: number) {
    this.id=id;
    this.nume = nume;
    this.pret = pret;
    this.asociatie_id=asociatie_id;
  }
}
