import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifierComponent} from "../../_shared/notifier/notifier.component";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackbar: MatSnackBar) { }

  showNotification (message: string, button: string, titlu: string){
    this.snackbar.openFromComponent(NotifierComponent,
      {data:{
        title: titlu,
        message: message,
          buttonText: button,
        },
        duration:5000,
        horizontalPosition:"center",
        verticalPosition:"bottom",
        panelClass:titlu
      });
  }
}
