import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'estudiantes'})
export class Estudiante {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  nombre: string;
  
  @Column()
  apellido: string;

  @Column()
  fechaNacimiento: Date;

  @ManyToMany(()=>Clase, clases => clases.estudiantes)
  clases:Clase[];


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
