import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierComponent } from './notifier/notifier.component';
import {MatButtonModule} from "@angular/material/button";
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    NotifierComponent,
    DeleteConfirmationComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class SharedModule { }
