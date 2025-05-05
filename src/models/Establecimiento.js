import { Direccion } from "./Direccion.js";

export class Establecimiento extends Direccion {
  constructor(departamento, municipio, zona, av_calle, nombre_establecimiento){
    super(departamento, municipio, zona, av_calle);

    this.departamento=departamento;
    this.municipio=municipio;
    this.zona=zona;
    this.av_calle=av_calle;
    this.nombre_establecimiento=nombre_establecimiento;
  }
}
