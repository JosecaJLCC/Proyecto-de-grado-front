import { Persona } from "./Persona.js";
export class Paciente extends Persona {
  constructor(ci,  nombre, paterno, materno, nacionalidad,
            estado_civil, nro_telf, sexo, fecha_nacimiento,
            departamento, municipio, zona, av_calle, nro_puerta,
            id_microred, nombre_carpeta,
            peso, estatura, tipo_sangre){
    super(ci, nombre, paterno, materno, nacionalidad,
          estado_civil, nro_telf, sexo, fecha_nacimiento,
          departamento, municipio, zona, av_calle, nro_puerta);
    this.id_microred=id_microred;
    this.nombre_carpeta=nombre_carpeta;
    this.peso=peso;
    this.estatura=estatura;
    this.tipo_sangre=tipo_sangre;
  }
}
