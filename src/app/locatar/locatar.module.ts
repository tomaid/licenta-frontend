import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocatarRoutingModule } from './locatar-routing.module';
import { LocatarComponent } from './locatar.component';
import { LocatarHeaderComponent } from './locatar-header/locatar-header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { AvizierComponent } from './avizier/avizier.component';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { FacturiComponent } from './facturi/facturi.component';
import { PlataFacturiComponent } from './facturi/plata-facturi/plata-facturi.component';
import { VizualizareFacturaComponent } from './facturi/vizualizare-factura/vizualizare-factura.component';
import { VizualizareChitantaComponent } from './facturi/vizualizare-chitanta/vizualizare-chitanta.component';
import { InlocuireElectrocasniceComponent } from './inlocuire-electrocasnice/inlocuire-electrocasnice.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { AjutorComponent } from './ajutor/ajutor.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { IntroducereIndexComponent } from './introducere-index/introducere-index.component';
import { IstoricIndecsiComponent } from './introducere-index/istoric-indecsi/istoric-indecsi.component';


@NgModule({
  declarations: [
    LocatarComponent,
    LocatarHeaderComponent,
    AvizierComponent,
    FacturiComponent,
    PlataFacturiComponent,
    VizualizareFacturaComponent,
    VizualizareChitantaComponent,
    InlocuireElectrocasniceComponent,
    AjutorComponent,
    IntroducereIndexComponent,
    IstoricIndecsiComponent
  ],
    imports: [
        CommonModule,
        LocatarRoutingModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        FormsModule,
        MatSortModule,
        MatExpansionModule
    ]
})
export class LocatarModule { }
