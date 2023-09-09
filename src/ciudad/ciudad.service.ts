import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDTO } from './entities/dto/ciudad.dto';

@Injectable()
export class CiudadService {

  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad) // inyecta un repositorio que corresponde a la entidad Ciudad
    private ciudadRepository: Repository<Ciudad> //vamos a hacer una instancia del repositorio
  ) { }

  async findAllRaw(): Promise<Ciudad[]> {
    let datos = await this.ciudadRepository.query("select * from ciudad");

    this.ciudades = [];
    datos.forEach(element => {
      let ciudad: Ciudad = new Ciudad(element['nombre']);
      this.ciudades.push(ciudad)
    });
    return this.ciudades;
  }

  async findAllOrm(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find()
  }

  async findById(id: number): Promise<Ciudad> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (ciudad)
        return ciudad
      else
        throw new Error('No se pudo encontrar la ciudad');
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en ciudad - ' + error
      }, HttpStatus.NOT_FOUND)
    }
  }

  async create(CiudadDTO : CiudadDTO): Promise<CiudadDTO>{
    
    //let ciudad : Ciudad = new Ciudad(CiudadDTO.nombre)
    //this.ciudadRepository.save(ciudad);
     
    return await this.ciudadRepository.save(new Ciudad(CiudadDTO.nombre));

// min 1:47:15
  }

}
