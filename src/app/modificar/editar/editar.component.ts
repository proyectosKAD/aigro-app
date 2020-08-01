import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {ScrollingModule } from '@angular/cdk/scrolling';

import {mensajeComponent} from '../../util/mensaje.component';
import {elementosDTO} from '../../lista-opciones';
import {PhttpService} from '../../servicios/consultadatos.service';
import { ConsultaElementos } from '../modificar.component';
import {ConsultarNegocio} from '../../servicios/serviciosDTO';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  showCultivo: boolean = false;
  tiponegocio: String;
  tiporegistro: string;
  idcliente: string;
  parms: ConsultarNegocio;

  constructor(public dialogRef: MatDialogRef<EditarComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private phttp: PhttpService, 
    public dialog: MatDialog) {
      if(data){
        console.log(data);

        this.tiporegistro = data.tiporegistro;
        this.idcliente = data.idCliente;

        if(this.tiporegistro == "Cultivo"){
          this.showCultivo = true;
          console.log("pruebas");
        }
        
        //Buscar por el ID en base de datos para obtener registro completo
        //this.parms.NumeroDocumento = this.idcliente.toString();
        //this.parms.jwt = localStorage.getItem('token');

      }
    }

    
    
  
  submit;
  reset;
  formControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  cultivos = [];
  departamentos = [];
  cobertura = [];
  poliza : Number;

  
  seasons: string[] = ['Cultivo', 'Semoviente', 'Siniestro'];  
  tiposiniestro: string[] = ['Cultivo', 'Semoviente'];  
  municipios: string[] = ['Chia', 'Bogota', 'Medellin', 'Cali'];
  documentos: string[] = ['Cédula de ciudadania', 'Cédula de extranjeria', 'NIT'];
  semovientes: string[] = ['Aves','Porcinos','Equinos','Bovinos'];

  ngOnInit() {
    this.phttp.getRespuesta("?id=1").subscribe((data)=>{      
      for(let key in data){
        if(key == "cultivos"){
          for (let index in data[key]) {
            let culDTO : elementosDTO;
              culDTO = { 
              idElemento : data[key][index].id,
              descripcion : data[key][index].descripcion
            };
            this.cultivos.push(culDTO);
          }
        }
        if(key == "departamentos"){
          for (let index in data[key]) {
            let depDTO : elementosDTO;
              depDTO = { 
              idElemento : data[key][index].id,
              descripcion : data[key][index].descripcion
            };
            this.departamentos.push(depDTO);
          }
        }
        if(key == "cobertura"){
          for (let index in data[key]) {
            let coberturaDTO : elementosDTO;
            coberturaDTO = { 
              idElemento : data[key][index].id,
              descripcion : data[key][index].descripcion
            };
            this.cobertura.push(coberturaDTO);
          }
        }
      }
    });  
    this.tiponegocio = this.seasons[1];

    /*
    this.phttp.consultarCultivo("cultivo", datos).subscribe((data)=>{
      for(let key in data){
        if(key == "0"){
          for (let index in data[key]) {
            if(index == "cultivos"){
              for (let i in data[key][index]){
                let cultDTO : ConsultaElementos;
                cultDTO = { idCliente : data[key][index][i].NumeroDocumento,
                  nombreFinca : data[key][index][i].NombreGranja,
                  numeroPoliza: data[key][index][i].Poliza,
                  tipoNegocio: data[key][index][i].IdTipoCultivo
                };
              }
            }
          }
        }    
      } 
    },(err) => {
      const dialogRef = this.dialog.open(mensajeComponent, {
        data: {mensage: err.error.text}
      });
    });

    */

    //this.poliza = + this.datos.idRegistro;

   /* this.phttp.getRespuesta("?id=1").subscribe((data)=>{      
      for(let key in data){
        if(key == "cultivos"){
          for (let index in data[key]) {
            let culDTO : elementosDTO;
              culDTO = { 
              idElemento : data[key][index].id,
              descripcion : data[key][index].descripcion
            };
            this.cultivos.push(culDTO);
          }
        }
      }
    });*/  
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo Obligatorio' :
          this.selectFormControl.hasError('requiered') ? 'Campo Obligatorio' :
        '';
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  actualizarData() {

  }
}
