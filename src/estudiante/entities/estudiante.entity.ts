import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteClase } from "./estudiante_clase.entity";

@Entity({name:'estudiantes'})
export class Estudiante {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  
  @Column()
  apellido: string;

  @Column()
  fechaNacimiento: Date;

/*   @ManyToMany(()=>Clase, clases => clases.estudiantes)
  clases:Clase[]; */ //se saca al crear Asistencia y la entity estudiante_clase 

  @OneToMany(()=>EstudianteClase, estudianteClases => estudianteClases.estudiante)
  estudianteClases:EstudianteClase[];

  constructor(pNombre: string,pApellido: string,pFechaNacimiento:Date){
    this.nombre= pNombre;
    this.apellido= pApellido;
    this.fechaNacimiento= pFechaNacimiento;
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
  
  public getApellido(): string {
    return this.apellido;
  }
  public setApellido(aApellido: string) {
    this.apellido = aApellido;
  }

  public getFechaNacimiento(): Date {
    return this.fechaNacimiento;
  }
  public setFechaNacimiento(aFechaNacimiento: Date) {
    this.fechaNacimiento = aFechaNacimiento;
  }








}
