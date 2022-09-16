import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociatieComponent } from './asociatie.component';
import {AuthGuardService} from "../_core/guards/auth-guard.service";
import {RoleGuardService} from "../_core/guards/role-guard.service";
import {CreareAsociatieComponent} from "./creare-asociatie/creare-asociatie.component";
import {AvizierComponent} from "./avizier/avizier.component";
import {DetaliiAsociatieComponent} from "./detalii-asociatie/detalii-asociatie.component";
import {ServiciiComponent} from "./servicii/servicii.component";
import {ApartamenteComponent} from "./apartamente/apartamente.component";
import {ContoareComponent} from "./contoare/contoare.component";
import {IndecsiComponent} from "./indecsi/indecsi.component";
import {CheltuieliComponent} from "./cheltuieli/cheltuieli.component";
import {FacturiComponent} from "./facturi/facturi.component";
import {VizualizareFacturaComponent} from "./facturi/vizualizare-factura/vizualizare-factura.component";
import {AjutorComponent} from "./ajutor/ajutor.component";

const routes: Routes = [
  { path: 'creare-asociatie', component: CreareAsociatieComponent, canActivate:[AuthGuardService]},
  { path: 'avizier', component: AvizierComponent, canActivate:[AuthGuardService,RoleGuardService]},
  { path: 'avizier/an/:an/luna/:luna', component: AvizierComponent, canActivate:[AuthGuardService,RoleGuardService]},
  { path: 'detalii-asociatie', component: DetaliiAsociatieComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'servicii', component: ServiciiComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'apartamente', component: ApartamenteComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'serviciu/:id/contoare', component: ContoareComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'serviciu/:id/contoare/:cid', component: IndecsiComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'cheltuieli', component: CheltuieliComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'facturi', component: FacturiComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'facturi/:id', component: VizualizareFacturaComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: 'ajutor', component: AjutorComponent, canActivate:[AuthGuardService, RoleGuardService]},
  { path: '', component: AsociatieComponent, canActivate:[AuthGuardService,RoleGuardService] },
  { path: '**', component: AsociatieComponent, canActivate:[AuthGuardService,RoleGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsociatieRoutingModule { }
