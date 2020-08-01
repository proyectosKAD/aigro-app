import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {PhttpService} from '../servicios/consultadatos.service';
import {PeticionEnvio, ResponseG, Insertsiniestros, Insertsemovientes, Insertcultivos, consultarListas, Clientes } from '../servicios/serviciosDTO';
import {mensajeComponent} from '../util/mensaje.component';
import {FormControl, Validators} from '@angular/forms';
import { Semovientes, Sistemas, Fincas, elementosDTO, Consulta } from '../lista-opciones';
import {MatTableDataSource, MatCheckboxModule, MatDialogConfig } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {InsertCultivoComponent} from "./insert-cultivo/insert-cultivo.component";
import {InsertSemovienteComponent} from "./insert-semoviente/insert-semoviente.component";
import { InsertSiniestroComponent } from './insert-siniestro/insert-siniestro.component';

export interface DialogData {
  mensage: string;
}

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent implements OnInit {

  constructor(  public dialog: MatDialog){};

  ngOnInit(){

  }

  addCultivo(){
    const dialogRef = new MatDialogConfig();
      this.dialog.open(InsertCultivoComponent, dialogRef);
  }

  addSemoviente(){
    const dialogRef = new MatDialogConfig();
      this.dialog.open(InsertSemovienteComponent, dialogRef);
  }
  
  addSiniestro(){
    const dialogRef = new MatDialogConfig();
      this.dialog.open(InsertSiniestroComponent, dialogRef);
  }
}