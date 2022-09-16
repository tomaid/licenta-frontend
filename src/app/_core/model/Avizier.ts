export interface Avizier{
  numarApartament:string,
  numarLocatari: number,
  suprafataApartament: number,
  sumaDePlatit:number,
  cpi:number,
  avizierRandDtoList: AvizierDetalii[]
}
export interface AvizierDetalii{
  consum:number,
  suma:number,
  text:string
}

