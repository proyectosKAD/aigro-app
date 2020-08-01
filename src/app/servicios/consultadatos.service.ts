//phttp.service.ts
import { Injectable } from '@angular/core';
import {ResponseG} from './serviciosDTO';
import {PeticionEnvio, Login, Insertsiniestros, Insertcultivos, Insertsemovientes, insertResponse,
        consultarListas, ConsultarNegocio, ConsultarNegocioRq} from './serviciosDTO';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable()
export class PhttpService {
  //"http://localhost:10080/rest/aigrodata.php";
  //"https://aigro.com.co/rest/aigrodata.php";
  //private ip: string = "http://localhost:10080/rest/";
  private ip: string = "https://aigro.com.co/rest/";
  private url: string = "aigrodata.php";
  private path: string;
  private pathLogin: string = "login.php";
  private urlCultivos: string = "insert_data.php?insertar=cultivo";
  private urlSemovientes: string = "insert_data.php?insertar=semoviente";
  private urlSiniestros: string = "insert_data.php?insertar=siniestro";
  private urlListas: string = "consultar_listas.php";
  private urlConsulta: string = "consultar_data.php?consultar=";
  private urlConsultaById: string = "consultarId_data.php?consultar=";
  private urlBorrar: string = "borrar_data.php?borrar=";
  private ArrayG: Array<ResponseG>;
  
  constructor( private http: HttpClient) { }

  peticionLogin(_body: Login): Observable<Login>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<Login>(this.ip + this.pathLogin, _body, httpOptions);
  }
  
  postRespuesta(_body: PeticionEnvio): Observable<ResponseG[]>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<ResponseG[]>(this.ip + this.url, _body, httpOptions);
  }

  getRespuesta(_params: string): Observable<ResponseG[]> {
    this.path = this.ip + this.url + _params;
    return this.http.get<ResponseG[]>(this.path);
  }
  putRespuesta(_id: number, _body: PeticionEnvio): Observable<ResponseG> {
    let urlcom = this.ip + this.url + "/" + _id;
    return this.http.put<ResponseG>(urlcom, _body);
  }

  consultarListas(_params: string, _body: consultarListas): Observable<insertResponse>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    let listas = this.ip + this.urlListas + _params;
    return this.http.post<insertResponse>(listas, _body, httpOptions);
  }

  insertCultivo(_body: Insertcultivos): Observable<insertResponse>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<insertResponse>(this.ip + this.urlCultivos, _body, httpOptions);
  }

  insertSemoviente(_body: Insertsemovientes): Observable<insertResponse>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<insertResponse>(this.ip + this.urlSemovientes, _body, httpOptions);
  }

  insertSiniestro(_body: Insertsiniestros): Observable<insertResponse>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<insertResponse>(this.ip + this.urlSiniestros, _body, httpOptions);
  }

  consultarCultivo(_params: string, _body: ConsultarNegocio): Observable<ConsultarNegocioRq>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    let consulta = this.ip + this.urlConsulta + _params;
    return this.http.post<ConsultarNegocioRq>(consulta, _body, httpOptions);
  }

  consultarSemoviente(_params: string, _body: ConsultarNegocio): Observable<ConsultarNegocioRq>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    let consulta = this.ip + this.urlConsulta + _params;
    return this.http.post<ConsultarNegocioRq>(consulta, _body, httpOptions);
  }

  consultarCultivoById(_params: string, id: number, _body: consultarListas): Observable<ConsultarNegocio>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    let consulta = this.ip + this.urlConsultaById + _params + "&id=" + id.toString();
    return this.http.post<ConsultarNegocio>(consulta, _body, httpOptions);
  }

  borrarCultivoById(_params: string, id: number, _body: consultarListas): Observable<ConsultarNegocio>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    let borrar = this.ip + this.urlBorrar + _params + "&id=" + id.toString();
    return this.http.post<ConsultarNegocio>(borrar, _body, httpOptions);
  }
}