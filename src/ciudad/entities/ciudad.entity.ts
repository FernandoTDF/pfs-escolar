import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"ciudad"}) //esta entity se va a mapear a la tabla ciudad
export class Ciudad {

  @PrimaryGeneratedColumn()//indica que va a ser nuestra primary key de nuestra tabla y se va a autogenerar
  id: number;

  @Column()//indica que va a ser una columna de la DB
  nombre: string;

  constructor(paramNombre: string) {
    this.nombre = paramNombre;
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }
};