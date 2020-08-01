import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {PhttpService} from '../../servicios/consultadatos.service';
import {PeticionEnvio, ResponseG, consultarListas, Insertsemovientes, Clientes} from '../../servicios/serviciosDTO';
import {mensajeComponent} from '../../util/mensaje.component';
import {FormControl, Validators} from '@angular/forms';
import {Sistemas, Fincas, elementosDTO, Consulta} from '../../lista-opciones';
import {MatTableDataSource } from '@angular/material';
import {MatDialogRef, MatDialog } from '@angular/material';

export interface DialogData {
  mensage: string;
}

@Component({
  selector: 'app-insert-semoviente',
  templateUrl: './insert-semoviente.component.html',
  styleUrls: ['./insert-semoviente.component.css']
})
export class InsertSemovienteComponent implements OnInit {

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

  tipoSemoviente: string;
  finca: string;
  fehcaAviso : string;
  fechaInspeccion: string;
  amparo: string;
  valorSiniestro: string;
  deducible: string;
  valorIndemnizar: number = 0;
  valorcabeza: number;
  longitud: number;

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
  poliza: number;
  valorasegurado: number;
  valortotal: number;
  tasa: number;
  prima: number = 0;
  fechaInicio: string;
  fechaFin: string;
  semovientecantidad: string;
  proposito: string;
  insertCliente = [];
  
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

  constructor(private phttp: PhttpService, public dialogRef: MatDialogRef<InsertSemovienteComponent>, 
    public dialog: MatDialog) {}

    public closeModal(){
      this.dialog.closeAll();
    }

    public confirmAdd(): void {

        for(let index in this.cobertura ){
          if(this.cobertura[index].checked){
            if(this.tipoCobertura == undefined){
              this.tipoCobertura = this.cobertura[index].idElemento;
            }else{
              this.tipoCobertura = this.cobertura[index].idElemento + "-"+ this.tipoCobertura;
            }
          }        
        }
  
        for(let index in this.actuacion ){
          if(this.actuacion[index].checked){
              this.tipoActuacion = this.actuacion[index].idElemento;
          }        
        }
  
        this.valortotal = this.valorasegurado * this.area;
        this.prima = this.valortotal * this.tasa;
  
        //**Insertar Semoviente */
        let sem = new Insertsemovientes();
        let cli;        
        for(let index in this.actuacion ){
          if(this.actuacion[index].checked){
            this.tipoActuacion = this.actuacion[index].idElemento;
            switch (this.tipoActuacion) {
              case "1":
                cli = new Clientes();
                cli.IdTipoActuacion = this.tipoActuacion;
                cli.IdTipoDocumento = this.tipoIdTomador;
                cli.NumeroDocumento = this.IdClienteTomador;
                this.insertCliente.push(cli);
                break;
              case "2":
                cli = new Clientes();
                cli.IdTipoActuacion = this.tipoActuacion;
                cli.IdTipoDocumento = this.tipoIdAsegurado;
                cli.NumeroDocumento = this.IdClienteAsegurado;
                this.insertCliente.push(cli);
                break;
              case "3":
                cli = new Clientes();
                cli.IdTipoActuacion = this.tipoActuacion;
                cli.IdTipoDocumento = this.tipoIdBeneficiario;
                cli.NumeroDocumento = this.IdClienteBeneficiario;
                this.insertCliente.push(cli);
                break;
              default:
                break;
            }
          }
        }
        
        sem.Clientes = this.insertCliente;
        sem.IdTipoSemoviente = this.tipoSemoviente;
        sem.IdTipoNegocio = this.tipoNegocio;
        sem.IdTipoActuacion = this.tipoActuacion;
        sem.IdTipoCobertura = this.tipoCobertura;
        sem.IdTipoDocumento = this.tipoIdTomador;
        sem.NumeroDocumento = this.IdClienteTomador;
        sem.IdDepartamento = this.departamento;
        sem.IdMunicipio = this.municipio["idElemento"];
        sem.AnoNegocio = this.ano;
        sem.NombreGranja = this.finca;
        sem.Vereda = this.vereda;
        sem.Semoviente = this.semovientecantidad;
        sem.Latitud = this.latitud;
        sem.Proposito = this.proposito;
        sem.Densidad = this.densidad;
        sem.Poliza = this.poliza.toString();
        sem.ValorAsegurado = this.valorasegurado.toString();
        sem.ValorAseguradoTotal = this.valortotal.toString();
        sem.Tasa = this.tasa.toString();
        sem.Prima = this.prima.toString();
        sem.Deducible = this.deducible;
        sem.VigenciaDesde = this.fechaInicio;
        sem.VigenciaHasta = this.fechaFin;
        sem.jwt = localStorage.getItem('token');
  
        this.phttp.insertSemoviente(sem).subscribe((data)=>{
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: data.message}
          });
        },(err) => {
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: err.error.text}
          });
        });

      }
  
  
    ngOnInit() {
  
      this.prima = 0;  
  
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
  
  }
