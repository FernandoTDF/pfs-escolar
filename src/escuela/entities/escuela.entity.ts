import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
