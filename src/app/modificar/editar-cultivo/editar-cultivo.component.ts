import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import {PhttpService} from '../../servicios/consultadatos.service';
import {ConsultarNegocio, consultarListas, Insertcultivos, Clientes} from '../../servicios/serviciosDTO';
import {mensajeComponent} from '../../util/mensaje.component';
import {elementosDTO } from '../../lista-opciones';

@Component({
  selector: 'app-editar-cultivo',
  templateUrl: './editar-cultivo.component.html',
  styleUrls: ['./editar-cultivo.component.css']
})
export class EditarCultivoComponent implements OnInit {

  submit;
  reset;
  showCultivo: boolean = false;
  showTomador: boolean = false;
  showAsegurado: boolean = false;
  showBeneficiario: boolean = false;
  showPlagas: boolean = false;
  tiponegocio: String;
  tiporegistro: string;
  idcliente: string;
  parms: ConsultarNegocio;

  //** Campos del formulario */
  tipoCultivo: string;
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
  valortotal: number;
  tasa: number;
  prima: number;
  deducible: number;
  fechaInicio: Date;
  fechaFin: Date;
  tipoActuacion: string;
  

  //** Variable auxiliares */
  idRegistro: number; 
  totalDep: string;
  insertCliente = [];

  tipoIdTomador: string;
  tipoIdAsegurado: string;
  IdClienteAsegurado: string;
  tipoIdBeneficiario: string;
  IdClienteBeneficiario: string;

  //**Listas */
  cultivos = [];
  negocio = [];
  cobertura = [];
  actuacion = [];
  departamentos = [];
  municipios = [];
  documentos = [];

  constructor(public dialogRef: MatDialogRef<EditarCultivoComponent>, 
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

    //** Obtener datos del cultivo por Id */
    this.phttp.consultarCultivoById("cultivo", this.idRegistro, token).subscribe((data)=>{
      if(data["message"] != undefined){
        const dialogRef = this.dialog.open(mensajeComponent, {
          data: {mensage: data["message"]}
        });
      }else{
        this.tipoCultivo = data[0].IdTipoCultivo;
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
              data: {mensage: err.error.text}
            });
          });
        },(err) => {
          const dialogRef = this.dialog.open(mensajeComponent, {
            data: {mensage: err.error.text}
          });
        }); 
      }
    });

    

  }

  getErrorMessage() {
   
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  actualizarData() {

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
    cul.Deducible = this.deducible.toString();
    cul.VigenciaDesde = this.fechaInicio.toString();
    cul.VigenciaHasta = this.fechaFin.toString();
    cul.Tomador = this.IdClienteTomador.toString();
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

  change(event){
    //** Se consulta el municipio según el departamento seleccionado */
    if(event.isUserInput) {
      let token = new consultarListas();
      token.jwt = localStorage.getItem('token');
      this.municipios = [];
      this.phttp.consultarListas("?records=municipios&departamento="+event.source.value, token).subscribe((data)=>{
      this.totalDep = data[0].total_records;
      this.phttp.consultarListas("?listas=municipios&dep="+event.source.value+"&page=1&rows="+data[0].total_records, token).subscribe((data)=>{
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

  public closeModal(){
    this.dialog.closeAll();
  }

}