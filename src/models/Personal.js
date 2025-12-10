import { Persona } from "./Persona.js";
export class Personal extends Persona {
  constructor(ci, nombre, paterno, materno, nacionalidad,
            estado_civil, nro_telf, sexo, fecha_nacimiento,
            departamento, municipio, zona, av_calle, nro_puerta,
            id_microred, cargo, id_profesion, nombre_profesion,
          id_area, nombre_area, nro_matricula, fecha_ingreso, id_usuario_rol){
    super(ci, nombre, paterno, materno, nacionalidad,
          estado_civil, nro_telf, sexo, fecha_nacimiento,
          departamento, municipio, zona, av_calle, nro_puerta)
    this.id_microred=id_microred;
    this.cargo=cargo;
    this.id_profesion=id_profesion;
    this.nombre_profesion=nombre_profesion;
    this.id_area=id_area;
    this.nombre_area=nombre_area;
    this.nro_matricula=nro_matricula;
    this.fecha_ingreso=fecha_ingreso;
    this.id_usuario_rol=id_usuario_rol
  }
}
