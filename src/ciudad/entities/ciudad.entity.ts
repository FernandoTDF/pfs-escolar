import { Escuela } from "src/escuela/entities/escuela.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({name:"ciudad"}) //esta entity se va a mapear a la tabla ciudad
export class Ciudad {

  @PrimaryGeneratedColumn()//indica que va a ser nuestra primary key de nuestra tabla y se va a autogenerar
  id: number;

  @Column()//indica que va a ser una columna de la DB
  nombre: string;


  @OneToMany(()=>Escuela, escuela => escuela.ciudad) //Escuela es la entidad a la q hace referencia
  public escuelas:Escuela[];



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