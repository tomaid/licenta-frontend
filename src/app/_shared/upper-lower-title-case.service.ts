import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpperLowerTitleCaseService {

  constructor() {}

  titleCase(strString: string){
    if(strString!=null) {
      if (strString.length > 0)
        return strString[0].toUpperCase() + strString.slice(1);
    }
    return strString;
  }

  upperCase(strString: string){
    if(strString!=null) {
      if (strString.length > 0)
        return strString.toLocaleUpperCase();
    }
    return strString;
  }
  lowerCase(strString: string){
    if(strString!=null) {
      if (strString.length > 0)
        return strString.toLocaleLowerCase();
    }
    return strString;
  }

}
