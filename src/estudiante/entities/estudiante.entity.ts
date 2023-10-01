import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'estudiante'})
export class Estudiante {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  nombre: string;
  
  @Column()
  apellido: string;

  @Column()
  fechaNacimiento: Date;


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
