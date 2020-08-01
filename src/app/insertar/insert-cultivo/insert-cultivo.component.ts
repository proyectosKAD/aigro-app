import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {PhttpService} from '../../servicios/consultadatos.service';
import {PeticionEnvio, ResponseG, Insertcultivos, consultarListas, Clientes} from '../../servicios/serviciosDTO';
import {mensajeComponent} from '../../util/mensaje.component';
import {FormControl, Validators} from '@angular/forms';
import {Sistemas, Fincas, elementosDTO, Consulta} from '../../lista-opciones';
import {MatTableDataSource } from '@angular/material';
import {MatDialogRef, MatDialog } from '@angular/material';
import { MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatButtonModule,  
  MatProgressBarModule } from '@angular/material';

export interface DialogData {
  mensage: string;
}

@Component({
  selector: 'app-insert-cultivo',
  templateUrl: './insert-cultivo.component.html',
  styleUrls: ['./insert-cultivo.component.css']
})
export class InsertCultivoComponent implements OnInit {

  formControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  showTomador: boolean = false;
  showAsegurado: boolean = false;
  showBeneficiario: boolean = false;
  showPlagas: boolean = false;

  submit;
  reset;
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
  deducible: string;
  valorIndemnizar: number;

  tipoCultivo: string;
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
  prima: number;
  fechaInicio: string;
  fechaFin: string;
  proposito: string;
  insertCliente = [];
  longitud: number;
  
  cultivos = [];
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

  constructor(private phttp: PhttpService, public dialogRef: MatDialogRef<InsertCultivoComponent>, 
    public dialog: MatDialog) {
      console.log("pruebas");    
    }

    public closeModal(){
      this.dialog.closeAll();
    }
  
    public confirmAdd(): void {

      //**Insertar Cultivo */
        for(let index in this.cobertura ){
          if(this.cobertura[index].checked){
            if(this.tipoCobertura == undefined){
              this.tipoCobertura = this.cobertura[index].idElemento;
            }else{
              this.tipoCobertura = this.cobertura[index].idElemento + "-"+ this.tipoCobertura;
            }
          }        
        }
  
        let cli;
        let cul = new Insertcultivos();
        for(let index in this.actuacion ){
          if(this.actuacion[index].checked){
              this.tipoActuacion = this.actuacion[index].idElemento;
              //** 1 Tomador - 2 Asegurado - 3 Beneficiario */
              if(this.tipoActuacion == "1"){
                cli = new Clientes();
                cli.IdTipoActuacion = this.tipoActuacion;
                cli.IdTipoDocumento = this.tipoIdTomador;
                cli.NumeroDocumento = this.IdClienteTomador;
                this.insertCliente.push(cli);
              }
              if(this.tipoActuacion == "2"){
                cli = new Clientes();
                cli.IdTipoActuacion = this.tipoActuacion;
                cli.IdTipoDocumento = this.tipoIdAsegurado;
                cli.NumeroDocumento = this.IdClienteAsegurado;
                this.insertCliente.push(cli);
              }
              if(this.tipoActuacion == "3"){
                cli = new Clientes();
                cli.IdTipoActuacion = this.tipoActuacion;
                cli.IdTipoDocumento = this.tipoIdBeneficiario;
                cli.NumeroDocumento = this.IdClienteBeneficiario;
                this.insertCliente.push(cli);
              }
          }
        }
        
        this.valortotal = this.valorasegurado * this.area;
        this.prima = this.valortotal * this.tasa;
  
        //** Mapear clientes */
        cul.Clientes = this.insertCliente;
        cul.IdTipoCultivo = this.tipoCultivo;
        cul.IdTipoNegocio = this.tipoNegocio;
        //cul.IdTipoActuacion = this.tipoActuacion;
        cul.IdTipoCobertura = this.tipoCobertura;
        //cul.IdTipoDocumento = this.tipoIdTomador;
        cul.IdDepartamento = this.departamento;
        cul.IdMunicipio = this.municipio["idElemento"];
        cul.AnoNegocio = this.ano;
        //cul.NumeroDocumento = this.IdClienteTomador;
        cul.NombreGranja = this.finca;
        cul.Vereda = this.vereda;
        cul.Latitud = this.latitud;
        cul.Area = this.area.toString();
        cul.Densidad = this.densidad;
        cul.Poliza = this.poliza.toString();
        cul.ValorAsegurado = this.valorasegurado.toString();
        cul.ValorAseguradoTotal = this.valortotal.toString();
        cul.Tasa = this.tasa.toString();
        cul.Prima = this.prima.toString();
        cul.Deducible = this.deducible;
        cul.VigenciaDesde = this.fechaInicio;
        cul.VigenciaHasta = this.fechaFin;
        cul.Tomador = this.IdClienteTomador;
        cul.Asegurado = this.IdClienteAsegurado;
        cul.Beneficiario = this.IdClienteBeneficiario;
        cul.jwt = localStorage.getItem('token');
  
        this.phttp.insertCultivo(cul).subscribe((data)=>{
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
  
      //** Valor a indemnizar inicializado en 0 */
      this.valorIndemnizar = 0;
  
  
      //** Consulta de Listas parametricas */
      let token = new consultarListas();
      token.jwt = localStorage.getItem('token');  
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
  }