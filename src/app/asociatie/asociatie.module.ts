import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsociatieRoutingModule } from './asociatie-routing.module';
import { AsociatieComponent } from './asociatie.component';
import { CreareAsociatieComponent } from './creare-asociatie/creare-asociatie.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import { AsociatieHeaderComponent } from './asociatie-header/asociatie-header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AvizierComponent } from './avizier/avizier.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "../_core/interceptors/token-interceptor.service";
import { DetaliiAsociatieComponent } from './detalii-asociatie/detalii-asociatie.component';
import { ServiciiComponent } from './servicii/servicii.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ModificareServiciuComponent } from './servicii/modificare-serviciu/modificare-serviciu.component';
import { ApartamenteComponent } from './apartamente/apartamente.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from "@angular/material/dialog";
import { ApartamentFormComponent } from './apartamente/apartament-form/apartament-form.component';
import { ContoareComponent } from './contoare/contoare.component';
import { ContorFormComponent } from './contoare/contor-form/contor-form.component';
import { IndecsiComponent } from './indecsi/indecsi.component';
import { CheltuieliComponent } from './cheltuieli/cheltuieli.component';
import { CheltuieliFormComponent } from './cheltuieli/cheltuieli-form/cheltuieli-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { FacturiComponent } from './facturi/facturi.component';
import { GenerareFacturiComponent } from './facturi/generare-facturi/generare-facturi.component';
import { VizualizareFacturaComponent } from './facturi/vizualizare-factura/vizualizare-factura.component';
import { VizualizareChitantaComponent } from './facturi/vizualizare-chitanta/vizualizare-chitanta.component';
import { PlataFacturiComponent } from './facturi/plata-facturi/plata-facturi.component';
import { AjutorComponent } from './ajutor/ajutor.component';
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AsociatieComponent,
    CreareAsociatieComponent,
    AsociatieHeaderComponent,
    AvizierComponent,
    DetaliiAsociatieComponent,
    ServiciiComponent,
    ModificareServiciuComponent,
    ApartamenteComponent,
    ApartamentFormComponent,
    ContoareComponent,
    ContorFormComponent,
    IndecsiComponent,
    CheltuieliComponent,
    CheltuieliFormComponent,
    FacturiComponent,
    GenerareFacturiComponent,
    VizualizareFacturaComponent,
    VizualizareChitantaComponent,
    PlataFacturiComponent,
    AjutorComponent,
  ],
    imports: [
        CommonModule,
        AsociatieRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule
    ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService}],
})
export class AsociatieModule { }
