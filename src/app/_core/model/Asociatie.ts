export interface Asociatie{
  id:number,
  nume: string,
  cif: number,
  autorizatie: string,
  localitate: number,
  judet: number,
  strada: string,
  numar: string,
  bloc: string,
  scara: string,
}
export interface AsociatieFactura{
  id:number,
  nume: string,
  cif: number,
  autorizatie: string,
  localitate: number,
  judet: number,
  strada: string,
  numar: string,
  bloc: string,
  scara: string,
}
export class CreareAsociatieForm{
  nume: string;
  cif: number;
  autorizatie: string;
  localitate: number;
  strada: string;
  numar: string;
  bloc: string;
  scara: string;


  constructor(nume: string, cif: number, autorizatie: string, localitate: number, strada: string, numar: string, bloc: string, scara: string) {
    this.nume = nume;
    this.cif = cif;
    this.autorizatie = autorizatie;
    this.localitate = localitate;
    this.strada = strada;
    this.numar = numar;
    this.bloc = bloc;
    this.scara = scara;
  }
}
  export class AsociatieForm{
  nume: string;
  cif: number;
  autorizatie: string;
  localitate: number;
  strada: string;
  numar: string;
  bloc: string;
  scara: string;


  constructor(nume: string, cif: number, autorizatie: string, localitate: number, strada: string, numar: string, bloc: string, scara: string) {
    this.nume = nume;
    this.cif = cif;
    this.autorizatie = autorizatie;
    this.localitate = localitate;
    this.strada = strada;
    this.numar = numar;
    this.bloc = bloc;
    this.scara = scara;
  }

}
