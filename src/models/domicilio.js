import { Direccion } from "./Direccion.js";

export class Domicilio extends Direccion {
  constructor(departamento, municipio, zona, av_calle, nro_puerta){
    super(departamento, municipio, zona, av_calle);
    this.nro_puerta=nro_puerta;
  }
}
