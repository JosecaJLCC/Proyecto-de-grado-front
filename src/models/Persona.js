export class Persona {
  constructor(ci, extension, nombre, paterno, materno, nacionalidad,
               estado_civil, nro_telf, sexo, fecha_nacimiento,
               departamento, municipio, zona, av_calle, nro_puerta){
    this.ci=ci;
    this.extension=extension;
    this.nombre=nombre;
    this.paterno=paterno;
    this.materno=materno;
    this.nacionalidad=nacionalidad;
    this.estado_civil=estado_civil;
    this.nro_telf=nro_telf;
    this.sexo=sexo;
    this.fecha_nacimiento=fecha_nacimiento;

    this.departamento=departamento;
    this.municipio=municipio;
    this.zona=zona;
    this.av_calle=av_calle;

    this.nro_puerta=nro_puerta;
  }
}
