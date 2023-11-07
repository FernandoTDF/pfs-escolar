import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name:'ciudad_estudiante'})
export class CiudadEstudiante {

  @Column()
  direccion: string;
  
  
  @PrimaryColumn()
  estudianteId: number;
  
  @PrimaryColumn()
  ciudadId: number;
  



  constructor(pDireccion: string, pEstudiantesId: number, pCiudadId:number) {
    this.ciudadId = pCiudadId;
    this.estudianteId = pEstudiantesId;
    this.direccion = pDireccion;  
  }

  @ManyToOne(()=>Estudiante, estudiante => estudiante.estudianteClases)
  estudiante:Estudiante;

  @ManyToOne(()=>Ciudad, ciudad => ciudad.ciudadEstudiante)
  ciudad:Ciudad;



}