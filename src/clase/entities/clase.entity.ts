import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clase' })
export class Clase {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  nombre: string;


  @ManyToOne(()=>Profesor, profesor => profesor.clase)
  @JoinColumn({name: 'fk_id_profe'})
  profesor:Profesor;


  @ManyToOne(()=>Escuela, escuela => escuela.clases)
  @JoinColumn({name: 'fk_id_escuela'})
  escuela:Escuela;


  @ManyToMany(()=>Estudiante, estudiantes=>estudiantes.clases)
  @JoinTable({name: 'clase_estudiante'})
  estudiantes:Estudiante[];



  constructor(pNombre: string){
    this.nombre= pNombre;
  }



  public getId(): number {
    return this.id;
  };

  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(aNombre: string) {
    this.nombre = aNombre;
  }













}
