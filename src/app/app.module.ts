import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from  '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {PhttpService} from  './servicios/consultadatos.service';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ModificarComponent } from './modificar/modificar.component';
import { EditarComponent } from './modificar/editar/editar.component';

import { RouterModule } from '@angular/router';
import {MatToolbarModule, MatButtonModule, MatRadioModule, MatSelectModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatTableModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatCheckboxModule, MatTabsModule,
  MatProgressBarModule, MatCardModule} from '@angular/material';
      
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { InsertarComponent } from './insertar/insertar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { mensajeComponent } from './util/mensaje.component';
import { EditarCultivoComponent } from './modificar/editar-cultivo/editar-cultivo.component';
import { InsertCultivoComponent } from './insertar/insert-cultivo/insert-cultivo.component';
import { InsertSemovienteComponent } from './insertar/insert-semoviente/insert-semoviente.component';
import { InsertSiniestroComponent } from './insertar/insert-siniestro/insert-siniestro.component';
import { EditarSemovienteComponent } from './modificar/editar-semoviente/editar-semoviente.component';
import { Angular2CsvModule } from 'angular2-csv';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    InsertarComponent,
    ModificarComponent,
    ConsultarComponent,
    mensajeComponent
    ,EditarComponent
    ,EditarCultivoComponent
    ,InsertCultivoComponent, InsertSemovienteComponent, InsertSiniestroComponent, EditarSemovienteComponent
  ],
  imports: [
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    ScrollingModule, 
    MatCardModule,  
    MatProgressBarModule,
    Angular2CsvModule
  ],
  providers: [PhttpService],
  bootstrap: [AppComponent],
  entryComponents: [
    mensajeComponent
    ,EditarComponent
    ,EditarCultivoComponent
    ,EditarSemovienteComponent
    ,InsertCultivoComponent
    ,InsertSemovienteComponent
    ,InsertSiniestroComponent
  ]
})

export class AppModule { }