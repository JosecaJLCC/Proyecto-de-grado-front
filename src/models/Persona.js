import { Domicilio } from "./Domicilio";

export class Persona {
  constructor(ci, nombre, paterno, materno, nacionalidad,
               estado_civil, nro_telf, sexo, fecha_nacimiento,
              departamento, municipio, zona, av_calle, nro_puerta){
    this.ci=ci;
    this.nombre=nombre;
    this.paterno=paterno;
    this.materno=materno;
    this.nacionalidad=nacionalidad;
    this.estado_civil=estado_civil;
    this.nro_telf=nro_telf;
    this.sexo=sexo;
    this.fecha_nacimiento=fecha_nacimiento;
    this.domicilio = new Domicilio(departamento, municipio, zona, av_calle, nro_puerta);
  }

  setDomicilio(domicilio){
    this.domicilio=domicilio;
  }
}
