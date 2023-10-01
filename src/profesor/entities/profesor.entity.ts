import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'profesor'})
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() //  @Column(name: 'nombreProf')
  @IsNotEmpty()
  nombre: string;

  @Column()
  // @isString()  -  @isNotEmpty()  -  @MinKey(100)  -  @isEmail() - instalar "classValidator"
  @IsNotEmpty()
  apellido:string

  constructor(pNombre:string, pApellido:string) {
    this.nombre = pNombre;
    this.apellido = pApellido;
  };

  public getId():number{
    return this.id;
  };
  
  public getNombre():string{
    return this.nombre;
  }

  public setNombre(aNombre:string){
    this.nombre = aNombre;
  }

  public getApellido():string{
    return this.apellido;
  }

  public setApellido(aApellido:string){
    this.apellido = aApellido;
  }

}
