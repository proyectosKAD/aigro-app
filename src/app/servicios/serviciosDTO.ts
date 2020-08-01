//peticionEnvio.ts

export class Login{
    public email:String;
    public password:String;
    public jwt: string; //token de seguridad
    //public token:string;
}

export class PeticionEnvio{
    public propiedad1:String;
    public propiedad2:String;
    public propiedad3:Date;
    public propiedad4:Date;
}

//responseG.ts

export class ResponseG{
    public id:String;
    public propiedad1:String;
    public propiedad2:String;
    public propiedad3:String;
    public propiedad4:String;
    public propiedad5:String;
    public propiedad6:String;
    public propiedad7:String;
    public propiedad8:String;
    public propiedad9:String;
    public propiedad10:String;
    public cultivos:cultivos[];
}

export class cultivos{
    public id:String;
    public descripcion:String;
}

export class insertResponse{
    public message: String;
}

export class consultarListas{
    public jwt: String;
}

export class Clientes{
    public IdTipoActuacion: String;
    public IdTipoDocumento: String;
    public NumeroDocumento: String;
    public Nombre: String;
    public Apellido: String;
    public RazonSocial: String;
    public Telefono: String;
    public Email: String;
}

export class Coberturas{
    public IdTipoCobertura: String;
    public Observacion: String;
}

export class Insertcultivos{
    public Clientes: Clientes[];
    public Coberturas: Coberturas[];
    public IdTipoCultivo: String;
    public IdTipoNegocio: String;
    //public IdTipoActuacion: String;
    public IdTipoCobertura: String;
    //public IdTipoDocumento: String;
    public IdDepartamento: String;
    public IdMunicipio: String;
    public AnoNegocio: String;
    //public NumeroDocumento: String;
    public NombreGranja: String;
    public Vereda: String;
    public Latitud: String;
    public Area: String;
    public Densidad: String;
    public Poliza: String;
    public ValorAsegurado: String;
    public ValorAseguradoTotal: String;
    public Tasa: String;
    public Prima: String;
    public Deducible: String;
    public VigenciaDesde: String;
    public VigenciaHasta: String;
    public Tomador: String;
    public Asegurado: String;
    public Beneficiario: String;
    public jwt: String;
}

export class Insertsemovientes{
    public Clientes: Clientes[];
    public Coberturas: Coberturas[];
    public IdTipoSemoviente: String;
    public IdTipoNegocio: String;
    public IdTipoActuacion: String;
    public IdTipoCobertura: String;
    public IdTipoDocumento: String;
    public IdDepartamento: String;
    public IdMunicipio: String;
    public AnoNegocio: String;
    public NumeroDocumento: String;
    public NombreGranja: String;
    public Vereda: String;
    public Semoviente: String;
    public Latitud: String;
    public Proposito: String;
    public Densidad: String;
    public Poliza: String;
    public ValorAsegurado: String;
    public ValorAseguradoTotal: String;
    public Tasa: String;
    public Prima: String;
    public Deducible: String;
    public VigenciaDesde: String;
    public VigenciaHasta: String;
    public jwt: String;
}

export class Insertsiniestros{
    public IdTipoSiniestro: String;
    public IdTipoDocumento: String;
    public NumeroDocumento: String;
    public NombreGranja: String;
    public FechaAviso: String;
    public FechaInspeccion: String;
    public AmparoAfectado: String;
    public ValorSiniestro: String;
    public Deducible: String;
    public ValorIndemnizar: String;
    public jwt: String;
}

export class ConsultarNegocio{
    public Id: String;
    public IdTipoDocumento: String;
    public NumeroDocumento: String;
    public NombreGranja: String;
    public p_asegurado: String;
    public Poliza: String;
    public IdTipoCultivo: String;
    public idTipoSemoviente: String;
    public tipoSiniestro: String;
    public jwt: String;
}

export class ConsultarNegocioRq{
    public IdTipoDocumento: String;
    public NumeroDocumento: String;
    public jwt: String;
}

export class BorrarRegistroRq{
    public id: Number;
    public numeroDocumento: String;
    public jwt: String;
}

