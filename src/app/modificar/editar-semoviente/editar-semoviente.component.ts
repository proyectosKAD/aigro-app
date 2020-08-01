import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import {PhttpService} from '../../servicios/consultadatos.service';
import {ConsultarNegocio, consultarListas, Insertsemovientes, Clientes} from '../../servicios/serviciosDTO';
import {mensajeComponent} from '../../util/mensaje.component';
import {elementosDTO } from '../../lista-opciones';

@Component({
  selector: 'app-editar-semoviente',
  templateUrl: './editar-semoviente.component.html',
  styleUrls: ['./editar-semoviente.component.css']
})
export class EditarSemovienteComponent implements OnInit {

  submit;
  reset;
  checked = true;
  showCultivo: boolean = false;
  showTomador: boolean = false;
  showAsegurado: boolean = false;
  showBeneficiario: boolean = false;
  showPlagas: boolean = false;

  //** Variable auxiliares */
  idRegistro: number; 
  totalDep: number;
  insertCliente = [];

  //** Variables del formulario */
  tipoSemoviente: string;
  tipoNegocio: string;
  ano: string;
  tipoCobertura: string;
  IdClienteTomador: number;
  finca: string;
  departamento: string;
  municipio: string;
  vereda: string;
  latitud: string;
  longitud: string;
  area: number;
  densidad: string;
  poliza: string;
  valorasegurado: number;
  valortotal: number = 0;
  tasa: number;
  prima: number = 0;
  deducible: number;
  fechaInicio: Date;
  fechaFin: Date;
  proposito: string;
  semovientecantidad: number;
  tipoActuacion: string;

  tipoIdTomador: string;
  tipoIdAsegurado: string;
  IdClienteAsegurado: string;
  tipoIdBeneficiario: string;
  IdClienteBeneficiario: string;

  //** Listas formulario */
  semovientes = [];
  negocio = [];
  actuacion = [];
  departamentos = [];
  documentos = [];
  cobertura =[];
  municipios = [];

  constructor(public dialogRef: MatDialogRef<EditarSemovienteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private phttp: PhttpService, 
    public dialog: MatDialog) {
      try {
        this.idRegistro = data.id;
      } catch (error) {
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: 'Ocurrio un error al intentar modificar cultivo ' + error.getErrorMessage()}
        });
      }
      
    }

  ngOnInit() {
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

    //** Obtener lista tipo de negocios */
    this.phttp.consultarListas("?listas=tipoNegocio", token).subscribe((data)=>{
      if(data["message"] != undefined){
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
      }else{
        for(let key in data){
          for (let index in data[key]) {
            if(index == "negocios"){
              for (let i in data[key][index]){
                let item : elementosDTO;
                item = { 
                  idElemento : data[key][index][i].id,
                  descripcion : data[key][index][i].descripcion
                };
                this.negocio.push(item);
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

    //** Obtener lista tipo de actuación */
    this.phttp.consultarListas("?listas=actuacion", token).subscribe((data)=>{
      if(data["message"] != undefined){
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
      }else{
        for(let key in data){
          for (let index in data[key]) {
            if(index == "actuacion"){
              for (let i in data[key][index]){
                let item : elementosDTO;
                item = { 
                  idElemento : data[key][index][i].id,
                  descripcion : data[key][index][i].descripcion
                };
                this.actuacion.push(item);
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

    //** Obtener lista tipo de coberturas */
    this.phttp.consultarListas("?listas=cobertura&sistema=1", token).subscribe((data)=>{
      if(data["message"] != undefined){
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
      }else{
        for(let key in data){
          for (let index in data[key]) {
            if(index == "coberturas"){
              for (let i in data[key][index]){
                let item : elementosDTO;
                item = { 
                  idElemento : data[key][index][i].id,
                  descripcion : data[key][index][i].descripcion
                };
                this.cobertura.push(item);
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

    this.phttp.consultarListas("?listas=tipoDoc", token).subscribe((data)=>{
      if(data["message"] != undefined){
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
      }else{
        for(let key in data){
          for (let index in data[key]) {
            if(index == "documentos"){
              for (let i in data[key][index]){
                let item : elementosDTO;
                item = { 
                  idElemento : data[key][index][i].id,
                  descripcion : data[key][index][i].descripcion
                };
                this.documentos.push(item);
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

    //** Obtener lista Departamentos */
    this.phttp.consultarListas("?records=departamentos", token).subscribe((data)=>{
      this.totalDep = data[0].total_records;
      this.phttp.consultarListas("?listas=departamentos&page=1&rows="+this.totalDep, token).subscribe((data)=>{
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

    //** Obtener datos del semoviente por Id */
    this.phttp.consultarCultivoById("semoviente", this.idRegistro, token).subscribe((data)=>{
      if(data["message"] != undefined){
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
      }else{
        this.valortotal = this.valorasegurado * this.semovientecantidad;
        this.prima = this.valortotal * this.tasa;

        this.tipoSemoviente = data[0].IdTipoSemoviente;
        this.tipoNegocio = data[0].IdTipoNegocio;
        this.ano = data[0].AnoNegocio;
        //tipo actuacion
        this.tipoCobertura = data[0].IdTipoCobertura;
        this.finca = data[0].NombreGranja;
        this.departamento = data[0].IdDepartamento;
        this.municipio = data[0].IdMunicipio;
        this.vereda = data[0].Vereda;
        this.latitud = data[0].Latitud;
        //Longitud?
        this.longitud = "10";
        this.area = data[0].Area;
        this.densidad = data[0].Densidad;
        this.poliza = data[0].Poliza;
        this.valorasegurado = data[0].ValorAsegurado;
        this.valortotal = data[0].ValorAseguradoTotal;
        this.tasa = data[0].Tasa;
        this.prima = data[0].Prima;
        this.deducible = data[0].Deducible;
        let inicioFecha = new Date(data[0].VigenciaDesde);
        this.fechaInicio = inicioFecha;
        let finFecha = new Date(data[0].VigenciaHasta);
        this.fechaFin = finFecha;
        this.semovientecantidad = data[0].Semoviente;
        this.proposito = data[0].Proposito;

        this.IdClienteTomador = data[0].NumeroDocumento;

        //** Obtener municipios según departamento */
        this.municipios = [];
        this.phttp.consultarListas("?records=municipios&departamento="+this.departamento, token).subscribe((data)=>{
          this.totalDep = data[0].total_records;
          this.phttp.consultarListas("?listas=municipios&dep="+this.departamento+"&page=1&rows="+data[0].total_records, token).subscribe((data)=>{
            for(let key in data){
              if(key == "0"){
                for (let index in data[key]) {
                  if(index == "municipios"){
                    for (let i in data[key][index]){
                      let munDTO : elementosDTO;
                      munDTO = { idElemento : data[key][index][i].id,
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
              data: {mensage: err.message}
            });
          });
        },(err) => {
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: err.message}
          });
        }); 
      }
    });



  }

  change(event) {
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
  
  actualizarData() {

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
    
    this.valortotal = this.valorasegurado * this.semovientecantidad;
    this.prima = this.valortotal * this.tasa;

    sem.Clientes = this.insertCliente;
    sem.IdTipoSemoviente = this.tipoSemoviente;
    sem.IdTipoNegocio = this.tipoNegocio;
    //sem.IdTipoActuacion = this.tipoActuacion;
    sem.IdTipoCobertura = this.tipoCobertura;
    sem.IdTipoDocumento = this.tipoIdTomador;
    sem.NumeroDocumento = this.IdClienteTomador.toString();
    sem.IdDepartamento = this.departamento;
    sem.IdMunicipio = this.municipio["idElemento"];
    sem.AnoNegocio = this.ano;
    sem.NombreGranja = this.finca;
    sem.Vereda = this.vereda;
    sem.Semoviente = this.semovientecantidad.toString();
    sem.Latitud = this.latitud;
    sem.Proposito = this.proposito;
    sem.Densidad = this.densidad;
    sem.Poliza = this.poliza.toString();
    sem.ValorAsegurado = this.valorasegurado.toString();
    sem.ValorAseguradoTotal = this.valortotal.toString();
    sem.Tasa = this.tasa.toString();
    sem.Prima = this.prima.toString();
    sem.Deducible = this.deducible.toString();
    sem.VigenciaDesde = this.fechaInicio.toString();
    sem.VigenciaHasta = this.fechaFin.toString();
    sem.jwt = localStorage.getItem('token');

    this.phttp.insertSemoviente(sem).subscribe((data)=>{
      const dialogRef = this.dialog.open(mensajeComponent, {
        data: {mensage: data.message}
      });
    },(err) => {
      const dialogRef = this.dialog.open(mensajeComponent, {
        data: {mensage: err.error.message}
      });
    });

  }

  getErrorMessage() {
  }

  public closeModal(){
    this.dialog.closeAll();
  }

}
