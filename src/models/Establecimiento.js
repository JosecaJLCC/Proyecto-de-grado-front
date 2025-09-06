import { Direccion } from "./Direccion.js";

export class Establecimiento extends Direccion {
  constructor(departamento, municipio, zona, av_calle, nombre_establecimient, tipo_establecimiento, id_microred){
    super(departamento, municipio, zona, av_calle);

    this.departamento=departamento.toUpperCase();
    this.municipio=municipio.toUpperCase();
    this.zona=zona.toUpperCase();
    this.av_calle=av_calle.toUpperCase();
    this.nombre_establecimiento=nombre_establecimiento.toUpperCase();
    this.nombre_establecimiento=nombre_establecimiento;
    this.tipo_establecimiento=tipo_establecimiento;
    this.id_microred=id_microred;
  }
}
