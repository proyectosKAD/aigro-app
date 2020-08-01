import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconRegistry, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { Angular2CsvComponent, Options } from 'angular2-csv';
import {mensajeComponent} from '../util/mensaje.component';
import {PhttpService} from '../servicios/consultadatos.service';
import {consultarListas, ResponseG, ConsultarNegocio} from '../servicios/serviciosDTO';
import { Semovientes, Sistemas, Fincas, elementosDTO, Consulta } from '../lista-opciones';

export interface ConsultaElementos {
  tipoNegocio: String;
  nombreFinca: String;
  numeroPoliza: number;
  idCliente: string;
}

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  providers: [PhttpService]
})
export class ConsultarComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(Angular2CsvComponent) csvComponent: Angular2CsvComponent;
  
  csvData: any;
  csvOptions: Options; // import this from angular-csv

  private modals: any[] = [];
  public show:boolean = false;
  public consultar:any = 'Show';
  public submit: boolean = false;
  
  length = 0;
  ELEMENT_DATA: ConsultaElementos[] = [];
  tipoCultivo: string;
  tipoSemoviente: string;
  finca: string;
  asegurado: string;
  idcliente: number;

  resultado: Array<ResponseG>;
  tiporegistro: string;
  seasons: string[] = ['Cultivo', 'Semoviente'];  
  cultivos = [];
  semovientes = [];
  
  displayedColumns: string[] = ['tipoNegocio', 'nombreFinca', 'numeroPoliza', 'idCliente'];
  dataSource = new MatTableDataSource([]);
 
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private phttp: PhttpService, public dialog: MatDialog) {
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
                  cultDTO = { idCliente : data[key][index][i].NumeroDocumento,
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
                  item = { idCliente : data[key][index][i].NumeroDocumento,
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
                    semovDTO = { idCliente : data[key][index][i].NumeroDocumento,
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

exportar(): void {
    console.log("pruebas");
  
   this.csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: ['Tipo Negocio', 'Nombre Finca', 'Numero Poliza', 'Identificacion del Tomador'],
    showTitle: false,
    title: '',
    useBom: false,
    removeNewLines: true,
    keys: ['tipoNegocio','nombreFinca','numeroPoliza', 'idCliente' ],
    filename:'miFile'
  };

  this.csvData = this.dataSource.data;

  setTimeout(() => { this.csvComponent.onDownload(); }, 0);

  }

}
