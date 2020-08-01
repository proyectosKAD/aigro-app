import { Component, Inject } from '@angular/core';
import {DialogData} from '../insertar/insertar.component';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {PeticionEnvio, ResponseG} from '../servicios/serviciosDTO';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class mensajeComponent {

  constructor(public dialogRef: MatDialogRef<mensajeComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  cerrar(): void {
    this.dialogRef.close();
  }

}
