import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthSwitchService {

  constructor() { }

  switchLuna(lunar: number){
    let luna = Number(lunar);
    let lunaString;
    switch (luna){
      case 1: {
        lunaString = "Ianuarie";
        break;
      }
      case 2: {
        lunaString = "Februarie";
        break;
      }
      case 3: {
        lunaString = "Martie";
        break;
      }
      case 4: {
        lunaString = "Aprilie";
        break;
      }
      case 5: {
        lunaString = "Mai";
        break;
      }
      case 6: {
        lunaString = "Iunie";
        break;
      }
      case 7: {
        lunaString = "Iulie";
        break;
      }
      case 8: {
        lunaString = "August";
        break;
      }
      case 9: {
        lunaString = "Septembrie";
        break;
      }
      case 10: {
        lunaString = "Octombrie";
        break;
      }
      case 11: {
        lunaString = "Noiembrie";
        break;
      }
      case 12: {
        lunaString = "Decembrie";
        break;
      }
      default: {
        lunaString = "Luna invalida";
        break;
      }
    }
    return lunaString;
  }
}
