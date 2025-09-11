export class Persona {
  constructor(ci, extension, nombre, paterno, materno, nacionalidad,
               estado_civil, nro_telf, sexo, fecha_nacimiento){
    this.ci=ci;
    this.extension=extension.toUpperCase();
    this.nombre=nombre.toUpperCase();
    this.paterno=paterno.toUpperCase();
    this.materno=materno.toUpperCase();
    this.nacionalidad=nacionalidad.toUpperCase();
    this.estado_civil=estado_civil.toUpperCase();
    this.nro_telf=nro_telf;
    this.sexo=sexo.toUpperCase();
    this.fecha_nacimiento=fecha_nacimiento;

  }
}
