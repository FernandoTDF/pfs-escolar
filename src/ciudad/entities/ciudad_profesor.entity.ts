import { Profesor } from "src/profesor/entities/profesor.entity";
import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name:"ciudad_profesor"}) // estamos haciendo la tabla "DomicilioProfesor"
export class CiudadProfesor {

 /*  @PrimaryGeneratedColumn()
  id: number; */ //se elimino porque el mosco no podia relacionar los FK de la tabla cuando trabajaba en el ProfesorService
  @PrimaryColumn()
  ciudadId:number;

  @PrimaryColumn()
  profesorId:number;

  @Column()
  direccion: string;



  constructor(pCiudadId:number, pProfesorId:number, pDireccion: string) {
    this.ciudadId = pCiudadId;
    this.profesorId = pProfesorId;
    this.direccion = pDireccion;  
  }

  @ManyToOne(()=>Profesor, profesor=>profesor.domicilios)
  profesor:Profesor;

  @ManyToOne(()=>Ciudad, ciudad=>ciudad.domicilios)
  ciudad:Ciudad;
  



};

