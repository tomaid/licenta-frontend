import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./_core/guards/auth-guard.service";
import {AutentificareComponent} from "./autentificare/autentificare.component";
import {InregistrareComponent} from "./inregistrare/inregistrare.component";
import {NoAuthGuardService} from "./_core/guards/no-auth-guard.service";
import {ResetareParolaComponent} from "./resetare-parola/resetare-parola.component";
import {DetaliiContComponent} from "./detalii-cont/detalii-cont.component";

const routes: Routes = [
  {path: 'autentificare', canActivate:[NoAuthGuardService], component:AutentificareComponent},
  {path: 'inregistrare', canActivate:[NoAuthGuardService],  component:InregistrareComponent},
  {path: 'resetare-parola', canActivate:[NoAuthGuardService], component:ResetareParolaComponent},
  {path: 'detalii-cont', canActivate:[AuthGuardService], component:DetaliiContComponent},
  {path: 'locatar', canActivate:[AuthGuardService], loadChildren: () => import('./locatar/locatar.module').then(m => m.LocatarModule) },
  {path: 'asociatie', canActivate:[AuthGuardService], loadChildren: () => import('./asociatie/asociatie.module').then(m => m.AsociatieModule)},
  {path: '**', redirectTo:'autentificare'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
