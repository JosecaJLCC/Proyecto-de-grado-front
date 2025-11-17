import { Direccion } from "./Direccion.js";

export class Establecimiento extends Direccion {
  constructor(departamento, municipio, zona, av_calle,
    nombre_establecimiento, tipo_establecimiento, id_microred){
    super(departamento, municipio, zona, av_calle);
    this.nombre_establecimiento=nombre_establecimiento;
    this.tipo_establecimiento=tipo_establecimiento;
    this.id_microred=id_microred;
  }
}
