import { Component, OnInit } from '@angular/core';
import { Opcion } from '../buscar';
import { Semovientes, Sistemas, Fincas, Cultivos, Consulta } from '../lista-opciones';
import {PeticionEnvio, ResponseG} from '../servicios/serviciosDTO';
import {PhttpService} from '../servicios/consultadatos.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  semovientes = [];
  consulta = Consulta;
  sistemas = Sistemas;
  fincas = Fincas;
  cultivos = Cultivos;
  peticion = new PeticionEnvio();
  peticionPut = new PeticionEnvio();
  resultado: Array<ResponseG>;
  id: number = 1;
  constructor(private phttp: PhttpService) { }

submitted = false;

onSubmit() { this.submitted = true; }

ngOnInit(){}

}
