import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'asistencia'})
export class Asistencia {

  @PrimaryColumn()
  claseId:number;

  @PrimaryColumn()
  estudianteId:number;
  
  @Column()
  fecha:Date;

  constructor(pClaseId:number, pEstudianteId:number, pFecha:Date){
    this.claseId=pClaseId;
    this.estudianteId=pEstudianteId;
    this.fecha = pFecha;
  }


  @ManyToOne(()=>EstudianteClase, estudianteclase => estudianteclase.asistencias)
  @JoinColumn()
  estudianteClase:EstudianteClase;

//Hora 2:00:00

}
