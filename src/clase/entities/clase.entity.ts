import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clase' })
export class Clase {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  nombre: string;


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
