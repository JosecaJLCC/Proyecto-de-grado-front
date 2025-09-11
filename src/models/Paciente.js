import { Direccion } from "./Direccion.js";
import { Persona } from "./Persona.js";

export class Paciente extends Persona {
  constructor(ci, extension, nombre, paterno, materno, nacionalidad,
               estado_civil, nro_telf, sexo, fecha_nacimiento,
               departamento, municipio, zona, av_calle, nro_puerta,
              id_microred, nombre_carpeta, color){
    super(ci, extension, nombre, paterno, materno, nacionalidad,
               estado_civil, nro_telf, sexo, fecha_nacimiento);
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
    this.departamento=departamento.toUpperCase();
    this.municipio=municipio.toUpperCase();
    this.zona=zona.toUpperCase();
    this.av_calle=av_calle.toUpperCase();
    this.nro_puerta=nro_puerta;
    this.id_microred=id_microred;
    this.nombre_carpeta=nombre_carpeta.toUpperCase();
    this.color=color.toUpperCase();
  }
}
