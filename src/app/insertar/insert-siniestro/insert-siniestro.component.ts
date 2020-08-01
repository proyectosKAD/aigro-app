import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {PhttpService} from '../../servicios/consultadatos.service';
import {PeticionEnvio, ResponseG, Insertsiniestros, Insertsemovientes, Insertcultivos, consultarListas, Clientes } from '../../servicios/serviciosDTO';
import {mensajeComponent} from '../../util/mensaje.component';
import {FormControl, Validators} from '@angular/forms';
import { Semovientes, Sistemas, Fincas, elementosDTO, Consulta } from '../../lista-opciones';
import {MatTableDataSource, MatCheckboxModule } from '@angular/material';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  mensage: string;
}

@Component({
  selector: 'app-insert-siniestro',
  templateUrl: './insert-siniestro.component.html',
  styleUrls: ['./insert-siniestro.component.css']
})
export class InsertSiniestroComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  showTomador: boolean = false;
  showAsegurado: boolean = false;
  showBeneficiario: boolean = false;
  showPlagas: boolean = false;

  submit;
  reset;
  tipoSiniestro: string;
  tipoId: string;
  IdCliente: string;

  tipoIdTomador: string;
  IdClienteTomador: string;
  tipoIdAsegurado: string;
  IdClienteAsegurado: string;
  tipoIdBeneficiario: string;
  IdClienteBeneficiario: string;

  finca: string;
  fehcaAviso : string;
  fechaInspeccion: string;
  amparo: string;
  valorSiniestro: string;
  deducible: string;
  valorIndemnizar: number;

  cultivo: string;
  tipoNegocio: string;
  tipoActuacion: string;
  tipoCobertura: string;
  departamento: string;
  municipio: string;
  ano: string; 
  vereda: string;
  latitud: string;
  area: number;
  densidad: string;
  densidadSemo: string;
  poliza: number;
  valorasegurado: number;
  valortotal: number;
  tasa: number;
  prima: number;
  valoraseguradoSemo: number;
  valortotalSemo: number;
  tasaSemo: number;
  primaSemo: number;
  fechaInicio: string;
  fechaFin: string;
  semovientecantidad: string;
  proposito: string;
  insertCliente = [];
  
  cultivos = [];
  semovientes = [];
  departamentos = [];
  municipios = [];
  cobertura = [];
  actuacion = [];
  documentos = [];
  negocio = [];
  consulta = Consulta;
  sistemas = Sistemas;
  fincas = Fincas;
   
  dataSource = new MatTableDataSource([]);
  peticion = new PeticionEnvio();
  peticionPut = new PeticionEnvio();
  resultado: Array<ResponseG>;
  id: number = 1;
  totalDep: string;

  @ViewChild(LoginComponent) child;

  constructor(private phttp: PhttpService, public dialogRef: MatDialogRef<InsertSiniestroComponent>, 
    public dialog: MatDialog) {}

    public closeModal(){
      this.dialog.closeAll();
    }

    ngOnInit() {

      //** Valor a indemnizar inicializado en 0 */
      this.valorIndemnizar = 0;
  
  
      //** Consulta de Listas parametricas */
      let token = new consultarListas();
      token.jwt = localStorage.getItem('token');
    
    //** Obtener Tipo de Semovientes */
    this.phttp.consultarListas("?listas=semovientes", token).subscribe((data)=>{
      if(data["message"] != undefined){
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
  
      let dep = new consultarListas();
      dep.jwt = localStorage.getItem('token');
      
      this.phttp.consultarListas("?records=departamentos", dep).subscribe((data)=>{
  
        this.totalDep = data[0].total_records;
        this.phttp.consultarListas("?listas=departamentos&page=1&rows="+this.totalDep, dep).subscribe((data)=>{
        for(let key in data){
          if(key == "0"){
            for (let index in data[key]) {
              if(index == "departamentos"){
                for (let i in data[key][index]){
                  let depDTO : elementosDTO;
                  depDTO = { 
                    idElemento : data[key][index][i].id,
                    descripcion : data[key][index][i].descripcion
                  };
                  this.departamentos.push(depDTO);
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
        
      },(err) => {
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: err.error.text}
        });
      });
  
      //** Lista tipo actuación */   
      this.phttp.getRespuesta("?id=1").subscribe((data)=>{     
        for(let key in data){
          if(key == "actuacion"){
            for (let index in data[key]) {
              let act : elementosDTO;
              act = { 
                idElemento : data[key][index].id,
                descripcion : data[key][index].descripcion
              };
              this.actuacion.push(act);
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
          if(key == "documento"){
            for (let index in data[key]) {
              let docDTO : elementosDTO;
              docDTO = { 
                idElemento : data[key][index].id,
                descripcion : data[key][index].descripcion
              };
              this.documentos.push(docDTO);
            }
          }
          if(key == "negocio"){
            for (let index in data[key]) {
              let negDTO : elementosDTO;
              negDTO = { 
                idElemento : data[key][index].id,
                descripcion : data[key][index].descripcion
              };
              this.negocio.push(negDTO);
            }
          }
        }
      });  
    }
    
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo Obligatorio' :
            this.selectFormControl.hasError('requiered') ? 'Campo Obligatorio' :
          '';
    }
      
    getCheckboxes() {    
      // Se valida si se selecciono TOMADOR para mostrar campos
      if(this.actuacion.filter(x => x.checked === true).map(x => x.idElemento).find(x => x== "1")){
        this.showTomador = true;
      }else if(this.actuacion.filter(x => x.checked === false).map(x => x.idElemento).find(x => x== "1")){
        this.showTomador = false;
      }
      // Se valida si se selecciono ASEGURADO para mostrar campos
      if(this.actuacion.filter(x => x.checked === true).map(x => x.idElemento).find(x => x== "2")){
        this.showAsegurado = true;
      }else if(this.actuacion.filter(x => x.checked === false).map(x => x.idElemento).find(x => x== "2")){
        this.showAsegurado = false;
      }
      // Se valida si se selecciono BENEFICIARIO para mostrar campos
      if(this.actuacion.filter(x => x.checked === true).map(x => x.idElemento).find(x => x== "3")){
        this.showBeneficiario = true;
      }else if(this.actuacion.filter(x => x.checked === false).map(x => x.idElemento).find(x => x== "3")){
        this.showBeneficiario = false;
      }
      // Se valida si se selecciono PLAGAS Y ENFERMEDADES para mostrar campos
      if(this.cobertura.filter(x => x.checked === true).map(x => x.idElemento).find(x => x== "5")){
        this.showPlagas = true;
      }else if(this.cobertura.filter(x => x.checked === false).map(x => x.idElemento).find(x => x== "5")){
        this.showPlagas = false;
      }
    }
  
    change(event){
      //Se consulta el municipio según el departamento seleccionado
      if(event.isUserInput) {
  
        let dep = new consultarListas();
        dep.jwt = localStorage.getItem('token');
      
        this.municipios = [];
  
        this.phttp.consultarListas("?records=municipios&departamento="+event.source.value, dep).subscribe((data)=>{
  
        this.totalDep = data[0].total_records;
        this.phttp.consultarListas("?listas=municipios&dep="+event.source.value+"&page=1&rows="+data[0].total_records, dep).subscribe((data)=>{
        for(let key in data){
          if(key == "0"){
            for (let index in data[key]) {
              if(index == "municipios"){
                for (let i in data[key][index]){
                  let munDTO : elementosDTO;
                  munDTO = { 
                    idElemento : data[key][index][i].id,
                    descripcion : data[key][index][i].descripcion
                  };
                  this.municipios.push(munDTO);
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
        
      },(err) => {
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: err.error.text}
        });
      });
      }else{
  
      }
    }
  
    public clean() {
      
    }
  
    tiposiniestro: string[] = ['Cultivo', 'Semoviente'];  

    public confirmAdd(): void {

        //**Insertar Siniestro */  
        let sini = new Insertsiniestros();
        sini.IdTipoSiniestro = this.tipoSiniestro;
        sini.IdTipoDocumento = this.tipoId;
        sini.NumeroDocumento = this.IdCliente;
        sini.NombreGranja = this.finca;
        sini.FechaAviso = this.fehcaAviso;
        sini.FechaInspeccion = this.fechaInspeccion;
        sini.AmparoAfectado = this.amparo;
        sini.ValorSiniestro = this.valorSiniestro;
        sini.Deducible = this.deducible;
        sini.ValorIndemnizar = this.valorIndemnizar.toString();
        sini.jwt = localStorage.getItem('token');
        
        this.phttp.insertSiniestro(sini).subscribe((data)=>{
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: data.message}
          });
        },(err) => {
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: err.error.text}
          });
        });
      }
        
  }