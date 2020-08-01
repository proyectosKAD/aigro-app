import {Semovientes} from './lista-opciones';

export class Opcion {
 
    constructor(
      public id: Number,
      public tipoconsulta: String,
      public sistema: String,
      public semoviente: String,
      //public idelemento: string,
      //public descripcion: ResponseG,
      
      public cultivo: String,
      public finca?: String
    ) {  }

  }