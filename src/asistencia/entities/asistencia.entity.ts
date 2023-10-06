import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'asistencia'})
export class Asistencia {


  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  fecha:Date;



}
