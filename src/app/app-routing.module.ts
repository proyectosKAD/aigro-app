import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarComponent } from './consultar/consultar.component';
import { InsertarComponent } from './insertar/insertar.component';
import { ModificarComponent } from './modificar/modificar.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'insertar', component: InsertarComponent},
  { path: 'consultar', component: ConsultarComponent},
  { path: 'modificar', component: ModificarComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
