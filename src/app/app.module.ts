import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutentificareComponent } from './autentificare/autentificare.component';
import { InregistrareComponent } from './inregistrare/inregistrare.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./_shared/shared.module";
import {CoreModule} from "./_core/core.module";
import { ResetareParolaComponent } from './resetare-parola/resetare-parola.component';
import { DetaliiContComponent } from './detalii-cont/detalii-cont.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    AutentificareComponent,
    InregistrareComponent,
    ResetareParolaComponent,
    DetaliiContComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    SharedModule,
    CoreModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ro-RO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
