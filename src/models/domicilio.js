import { Direccion } from "./Direccion.js";

export class Domicilio extends Direccion {
  constructor(departamento, municipio, zona, av_calle, nro_puerta){
    super(departamento, municipio, zona, av_calle);

    this.departamento=departamento.toUpperCase();
    this.municipio=municipio.toUpperCase();
    this.zona=zona.toUpperCase();
    this.av_calle=av_calle.toUpperCase();
    this.nro_puerta=nro_puerta;
  }
}
