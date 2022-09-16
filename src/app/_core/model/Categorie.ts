export interface Categorie{
  id:number,
  denumire: string
}
export interface Produs{
  idCategorie: number
  denumireCategorie: string,
  cicluNumere: number,
  durataCiclu:number
}
export interface ProdusArray{
  produs: Produs[],
  pret: number
}
export interface ProdusePrimiteDeLaAlgoritm{
 denumire: string,
  pret: number,
  consum:number
}
export interface ListaProdusePrimiteDeLaAlgoritm{
  produsePrimite: ProdusePrimiteDeLaAlgoritm[],
  generatii: number,
  pretTotal: number,
  totalKw:number
  varianta:string
}
