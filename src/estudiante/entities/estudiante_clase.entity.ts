import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Asistencia } from "src/asistencia/entities/asistencia.entity";


@Entity('clase_estudiante')
export class EstudianteClase{

  @PrimaryColumn()
  estudianteId:number;

  @PrimaryColumn()
  claseId:number;

  constructor(pEstudianteId:number, pClaseId:number){
    this.estudianteId = pEstudianteId;
    this.claseId = pClaseId;
  }

  @ManyToOne(()=>Estudiante, estudiante => estudiante.estudianteClases) //"estudianteClases" porque van a aser las clases de ese estudiante
  @JoinColumn()
  estudiante:Estudiante;

  @ManyToOne(()=>Clase, clase => clase.estudianteClases)
  @JoinColumn()
  clase:Clase;

  @OneToMany(()=>Asistencia, asistencia => asistencia.estudianteClase)
  asistencias:Asistencia[];

}