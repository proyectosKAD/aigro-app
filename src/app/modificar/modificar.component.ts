import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconRegistry, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';

import {PhttpService} from '../servicios/consultadatos.service';
import {consultarListas, ResponseG, ConsultarNegocio, BorrarRegistroRq} from '../servicios/serviciosDTO';
import {elementosDTO } from '../lista-opciones';
import {mensajeComponent} from '../util/mensaje.component';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { EditarComponent } from './editar/editar.component';
import {EditarCultivoComponent} from './editar-cultivo/editar-cultivo.component';
import { EditarSemovienteComponent } from './editar-semoviente/editar-semoviente.component';

export interface ConsultaElementos {
  id: number;
  tipoNegocio: String;
  nombreFinca: String;
  numeroPoliza: number;
  idCliente: string;
}

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
  providers: [PhttpService]
})
export class ModificarComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private modals: any[] = [];
  public show:boolean = false;
  public consultar:any = 'Show';
  
  submit;
  index: number;
  length = 0;
  ELEMENT_DATA: ConsultaElementos[] = [];
  tiporegistro: string;
  tipoCultivo: string;
  tipoSemoviente: string;
  finca: string;
  asegurado: string;
  idcliente: number;
  resultado: Array<ResponseG>;
  idRegistro: String;
  tiponegocio: string;
  seasons: string[] = ['Cultivo', 'Semoviente'];  
  cultivos = [];
  semovientes = [];
  
  displayedColumns: string[] = ['tipoNegocio', 'nombreFinca', 'numeroPoliza', 'idCliente','botones'];
  dataSource = new MatTableDataSource([]);
 
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private phttp: PhttpService, 
    public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/edit-icon.svg'));
  }

ngOnInit(){
//** Consulta de Listas parametricas */
let token = new consultarListas();
token.jwt = localStorage.getItem('token');
  
  //** Obtener Tipo de Semovientes */
  this.phttp.consultarListas("?listas=semovientes", token).subscribe((data)=>{
    if(data["message"] != undefined){
      this.show = false;
      const dialogRef = this.dialog.open(mensajeComponent, {
      data: {mensage: data["message"]}
    });
    }else{
      for(let key in data){
        for (let index in data[key]) {
          if(index == "semovientes"){
            for (let i in data[key][index]){
              let item : elementosDTO;
              item = { 
                idElemento : data[key][index][i].id,
                descripcion : data[key][index][i].descripcion
              };
              this.semovientes.push(item);
              }
            }
          } 
        } 
    }
    },(err) => {
      const dialogRef = this.dialog.open(mensajeComponent, {
        data: {mensage: err.error.message}
      });
  });

  //** Obtener Tipo de Cultivos */
  this.phttp.consultarListas("?listas=cultivos", token).subscribe((data)=>{
    if(data["message"] != undefined){
      this.show = false;
      const dialogRef = this.dialog.open(mensajeComponent, {
      data: {mensage: data["message"]}
    });
    }else{
      for(let key in data){
        for (let index in data[key]) {
          if(index == "cultivos"){
            for (let i in data[key][index]){
              let item : elementosDTO;
              item = { 
                idElemento : data[key][index][i].id,
                descripcion : data[key][index][i].descripcion
              };
              this.cultivos.push(item);
              }
            }
          } 
        } 
    }
    },(err) => {
      const dialogRef = this.dialog.open(mensajeComponent, {
        data: {mensage: err.error.message}
      });
  }); 
}

consultarDatos() {
  this.show = true;
  this.dataSource = new MatTableDataSource([]);
  this.ELEMENT_DATA = [];
  
  if(this.tipoCultivo == undefined && this.tipoSemoviente == undefined && this.finca == undefined && this.asegurado == undefined && this.idcliente == undefined){
    const dialogRef = this.dialog.open(mensajeComponent, {
      data: {mensage: "Debe diligenciar al menos un criterio de busqueda"}
    });
    this.show = false;

  }else{

    if(this.show){  
      this.consultar = "Show"; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
    let parms = new ConsultarNegocio();
    //----- Validar valores en parametros -----//
    if(this.idcliente != undefined && this.idcliente.toString() != ""){
      parms.NumeroDocumento = this.idcliente.toString();
    }
    if(this.finca != undefined && this.finca != ""){
      parms.NombreGranja = this.finca.toString();
    }
    if(this.asegurado != undefined && this.asegurado != ""){
      parms.p_asegurado = this.asegurado.toString();
    }
    if(this.tipoCultivo != undefined &&  this.tipoCultivo != ""){
      parms.IdTipoCultivo = this.tipoCultivo.toString();
    }
    if(this.tipoSemoviente != undefined &&  this.tipoSemoviente != ""){
      parms.idTipoSemoviente = this.tipoSemoviente.toString();
    }
    parms.jwt = localStorage.getItem('token');

    /** Consulta de cultivos */
    if(this.tiporegistro == "Cultivo"){
      this.phttp.consultarCultivo("cultivo", parms).subscribe((data)=>{
        if(data["message"] != undefined){
          this.show = false;
          const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
        }else{
          for(let key in data){
            for (let index in data[key]) {
              if(index == "cultivos"){
                for (let i in data[key][index]){
                  let cultDTO : ConsultaElementos;
                  cultDTO = { 
                    id : data[key][index][i].id,
                    idCliente : data[key][index][i].NumeroDocumento,
                    nombreFinca : data[key][index][i].NombreGranja,
                    numeroPoliza: data[key][index][i].Poliza,
                    tipoNegocio: data[key][index][i].IdTipoCultivo
                  };
                  this.ELEMENT_DATA.push(cultDTO);
                }
              }
            } 
          } 
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); 
          this.length = this.ELEMENT_DATA.length;
          this.dataSource.paginator = this.paginator;
        }
      },(err) => {
        this.show = false;
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: err.error.message}
        }); 
      });
    }
    //** Consulta de Semovientes */
    else if(this.tiporegistro == "Semoviente"){ 
      this.phttp.consultarSemoviente("semoviente", parms).subscribe((data)=>{
        if(data["message"] != undefined){
          this.show = false;
          const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
        }else{
          for(let key in data){
            for (let index in data[key]) {
              if(index == "semovientes"){
                for (let i in data[key][index]){
                  let item : ConsultaElementos;
                  item = { 
                    id : data[key][index][i].id,
                    idCliente : data[key][index][i].NumeroDocumento,
                    nombreFinca : data[key][index][i].NombreGranja,
                    numeroPoliza: data[key][index][i].Poliza,
                    tipoNegocio: data[key][index][i].TipoSemoviente
                  };
                  this.ELEMENT_DATA.push(item);
                }
              }
            }    
          } 
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); 
          this.length = this.ELEMENT_DATA.length;
          this.dataSource.paginator = this.paginator;
        }
      },(err) => {
        this.show = false;
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: err.error.message}
        }); 
      });
    }  
    else if(this.tiporegistro == "Siniestro"){ 
      this.phttp.consultarSemoviente("siniestro", parms).subscribe((data)=>{
        for(let key in data){
          if(key == "0"){
            for (let index in data[key]) {
              if(index == "siniestros"){
                for (let i in data[key][index]){
                  let semovDTO : ConsultaElementos;
                    semovDTO = { 
                      id : data[key][index][i].id,
                      idCliente : data[key][index][i].NumeroDocumento,
                      nombreFinca : data[key][index][i].NombreGranja,
                      numeroPoliza: data[key][index][i].Poliza,
                      tipoNegocio: data[key][index][i].tipoSiniestro
                  };
                  this.ELEMENT_DATA.push(semovDTO);
                }
              }
            }
          }    
        } 
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.length = this.ELEMENT_DATA.length;
        this.dataSource.paginator = this.paginator;
      },(err) => {
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: err.error.message}
        });
      });
    }  
  }
}

  editarDatos(i: number){
    if(this.tiporegistro == "Cultivo"){
      console.log("Modifica cultivo");
      const dialogRef = new MatDialogConfig();
      dialogRef.data = {
        id: this.dataSource.data[i]["id"],
        idCliente: this.dataSource.data[i]["idCliente"],
        tiporegistro: this.tiporegistro,
        tipoCultivo: 1
      };
      this.dialog.open(EditarCultivoComponent, dialogRef);

    }
    else if(this.tiporegistro == "Semoviente"){
      const dialogRef = new MatDialogConfig();
      dialogRef.data = {
        id: this.dataSource.data[i]["id"],
        idCliente: this.dataSource.data[i]["idCliente"],
        tiporegistro: this.tiporegistro
      };
      this.dialog.open(EditarSemovienteComponent, dialogRef);
    }
   /* const dialogRef = new MatDialogConfig();
    dialogRef.data = {
      id: this.dataSource.data[i]["id"],
      idCliente: this.dataSource.data[i]["idCliente"],
      tiporegistro: this.tiporegistro
    };

    this.dialog.open(EditarComponent, dialogRef);
  */
  }

  borrarDatos(i: number){

    this.index = i;
    const dialogRef = this.dialog.open(mensajeComponent, {
      data: {mensage: '¿Desea eliminar el registro?'}
    });
    //** Validar tipo de dato a eliminar */
    if(this.tiporegistro == "Cultivo"){
      let parms = new BorrarRegistroRq();
      parms.id = this.dataSource.data[i]["id"];
      parms.numeroDocumento = this.dataSource.data[i]["idCliente"];
      console.log(parms.id);

      let token = new consultarListas();
      token.jwt = localStorage.getItem('token');

      //** Servicio para borrar */
      this.phttp.borrarCultivoById("cultivo", this.dataSource.data[i]["id"], token).subscribe((data)=>{
        if(data["description"] != undefined){
            this.show = false;
            const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: data["description"]}
          });
          this.consultarDatos();
        }
      },(err) => {
          this.show = false;
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: err.error.message}
          }); 
        });



    }
    //Consumo servicio por id para eliminar
  }
  exportar(){
    
  }
}
