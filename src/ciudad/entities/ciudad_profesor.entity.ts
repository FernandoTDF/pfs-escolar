import { Profesor } from "src/profesor/entities/profesor.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name:"ciudad_profesor"}) // estamos haciendo la tabla "DomicilioProfesor"
export class CiudadProfesor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direccion: string;

  @ManyToOne(()=>Profesor, profesor=>profesor.domicilios)
  profesor:Profesor;

  @ManyToOne(()=>Ciudad, ciudad=>ciudad.domicilios)
  ciudad:Ciudad;
  



  constructor(pDireccion: string,) {
    this.direccion = pDireccion;
  }

};

