import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {


  constructor(@InjectRepository(Profesor)
  private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(CiudadProfesor)
    private readonly ciudadProfesorRepository: Repository<CiudadProfesor>
  ) { }

  //
  async create(createProfesorDto: CreateProfesorDto): Promise<any> {
    let profe: Profesor = new Profesor(createProfesorDto.nombre, createProfesorDto.apellido)
    let profeCreadoEnLa_db = await this.profesorRepository.save(profe)

    if (profeCreadoEnLa_db) {
      return profeCreadoEnLa_db;
    } else {
      return "no se ha creado"
    }
  }


  async createDomicilio(body: any): Promise<any> {

    const ciudadId = body.ciudadId;
    const profesorId = body.profesorId;
    const domicilio = body.direccion;

    const { city, teacher, address } = body;

    console.log("este es el ciudadId = " + ciudadId)
    console.log("este es el profesorId = " + profesorId)
    console.log("este es el domicilio =" + domicilio)

    /* console.log("este es el body =" + body)

    console.log("este es el city = " + city)
    console.log("este es el teacher = " + teacher)
    console.log("este es la address  =" + address)
*/

    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });

    if (!profesor) {
      return `error - no existe este profesor`
    }

    const ciudad = await this.ciudadRepository.findOne({ where: ({ id: ciudadId }) });
    if (!ciudad) {
      return `error - no existe esta ciudad para este profesor`
    }

    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({ where: { ciudadId: ciudadId, profesorId: profesorId } })

    if (nuevo_domicilio) {
      return `profesor ya tiene domicilio`
    } else {

      return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId, profesorId, domicilio))
    }
  }

  async findAll(): Promise<Profesor[]> {
    return await this.profesorRepository.find();
  }

  async findOne(id: number): Promise<Profesor> {
    let criterio: FindOneOptions = { where: { id: id } }
    let profeEncontrado: Profesor = await this.profesorRepository.findOne(criterio);

    if (!profeEncontrado) {
      throw new Error("no existe el docente buscado");
    } else {
      return profeEncontrado;
    }
  }

  async update(id: number, updateProfesorDto: CreateProfesorDto):Promise <any> {
    let criterioUpdate: FindOneOptions = { where: { id: id } };
    let profeFindUpdate: Profesor = await this.profesorRepository.findOne(criterioUpdate);
    let profeAntesCambio: Profesor = profeFindUpdate;


    if (profeFindUpdate) {
      profeFindUpdate.setNombre(updateProfesorDto.nombre);
      profeFindUpdate.setApellido(updateProfesorDto.apellido);

      profeFindUpdate = await this.profesorRepository.save(profeFindUpdate)

      if (profeFindUpdate) {
        return `Se ha actualizado el Profesor: antes: ${profeAntesCambio.getNombre()},  ${profeAntesCambio.getApellido()}  y ahora  ${profeFindUpdate.getNombre()},  ${profeFindUpdate.getApellido()}`
      } else {
        return `No funciono`
      }

    } else {
      return `no se encontro nada en la db`
    }
  }

  async remove(id: number):Promise <any> {
    let criterioRemove:FindOneOptions = { where : { id : id } }
    let profeParaRemover:Profesor = await this.profesorRepository.findOne(criterioRemove);

    if(profeParaRemover){
      await this.profesorRepository.remove(profeParaRemover)
      return "se removio" + profeParaRemover.apellido;

    }


  }
}
