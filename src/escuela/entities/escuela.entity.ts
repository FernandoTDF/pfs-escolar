import { IsNotEmpty } from "class-validator";
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'escuela'})
export class Escuela {
@PrimaryGeneratedColumn()
id:number;

@Column()
@IsNotEmpty()
nombre:string;

@Column()
@IsNotEmpty()
domicilio:string;

@ManyToOne(()=>Ciudad, ciudad =>ciudad.escuelas)
@JoinColumn({name: 'fk_id_ciudad'})
ciudad:Ciudad;


@OneToMany(()=>Clase, clases => clases.escuela)
clases:Clase[];
//min 51:20


constructor(pNombre:string, pDomicilio:string){
  this.nombre=pNombre;
  this.domicilio=pDomicilio;
}

public getId():number {
  return this.id;
}

public getNombre():string {
  return this.nombre;
}

public setNombre(aNombre:string){
  this.nombre = aNombre;
}

public getDomicilio():string {
  return this.domicilio;
}

public setDomicilio(aDomicilio:string){
  this.domicilio = aDomicilio;
}


}
