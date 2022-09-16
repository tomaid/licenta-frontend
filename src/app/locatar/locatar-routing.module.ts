import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocatarComponent } from './locatar.component';
import {AuthGuardService} from "../_core/guards/auth-guard.service";
import {CreareAsociatieComponent} from "../asociatie/creare-asociatie/creare-asociatie.component";
import {AvizierComponent} from "./avizier/avizier.component";
import {FacturiComponent} from "./facturi/facturi.component";
import {VizualizareFacturaComponent} from "./facturi/vizualizare-factura/vizualizare-factura.component";
import {InlocuireElectrocasniceComponent} from "./inlocuire-electrocasnice/inlocuire-electrocasnice.component";
import {AjutorComponent} from "./ajutor/ajutor.component";
import {IntroducereIndexComponent} from "./introducere-index/introducere-index.component";
import {IstoricIndecsiComponent} from "./introducere-index/istoric-indecsi/istoric-indecsi.component";

const routes: Routes = [
  { path: 'creare-asociatie', component: CreareAsociatieComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/avizier', component: AvizierComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/avizier/an/:an/luna/:luna', component: AvizierComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/factura', component: FacturiComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/factura/:fid', component: VizualizareFacturaComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/upgrade', component: InlocuireElectrocasniceComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/index', component: IntroducereIndexComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/service/:sid/contor/:cid/index', component: IstoricIndecsiComponent, canActivate:[AuthGuardService]},
  { path: 'apartament/:id/ajutor', component: AjutorComponent, canActivate:[AuthGuardService]},
  { path: '', component: LocatarComponent, canActivate:[AuthGuardService] },
  { path: '**', component: LocatarComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocatarRoutingModule { }
