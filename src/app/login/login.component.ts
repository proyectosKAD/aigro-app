import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {mensajeComponent} from '../util/mensaje.component';
import {Login} from '../servicios/serviciosDTO';
import {PhttpService} from '../servicios/consultadatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PhttpService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private phttp: PhttpService, public dialog: MatDialog) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() : void {

    let datos = new Login();
    datos.email = this.username;
    datos.password = this.password;

    this.phttp.peticionLogin(datos).subscribe((data)=>{
        this.router.navigate(["insertar"]);
        localStorage.setItem('token', data.jwt);
    },(err) => {
      const dialogRef = this.dialog.open(mensajeComponent, {
        data: {mensage: err.error.message}
      }); 
    });
  }
}
