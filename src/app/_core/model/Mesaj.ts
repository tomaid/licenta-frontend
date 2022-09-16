export class Mesaj{
  private _mesaj: string;

  constructor(mesaj: string) {
    this._mesaj = mesaj;
  }

  get mesaj(): string {
    return this._mesaj;
  }

  set mesaj(value: string) {
    this._mesaj = value;
  }
}
