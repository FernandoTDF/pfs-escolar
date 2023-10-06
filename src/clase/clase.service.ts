import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClaseService {

  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>) { }




  async create(ClaseDto: Clase): Promise<boolean> {
    let claseAux: Clase = new Clase(ClaseDto.nombre);
    let claseCreadaEnLaBase = await this.claseRepository.save(claseAux); //el metodo save retorna lo que creo por defecto

    if (claseCreadaEnLaBase) {
      return true;
    } else {
      return false;
    }
  }




  async findAll(): Promise<Clase[]> {
    return await this.claseRepository.find({relations:['estudiantes']});
  }

  async findOne(id: number): Promise<Clase> {
    try {
      let criterio: FindOneOptions = { where: { id: id }, relations:['estudiantes']}
      let clase: Clase = await this.claseRepository.findOne(criterio);
      if (clase)
        return clase
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
  //2:02:20

  async update(id: number, claseDto: Clase): Promise<string> {
    let criterio: FindOneOptions = { where: { id: id } }
    let clase: Clase = await this.claseRepository.findOne(criterio);
    let claseVieja: Clase = clase;

    if (clase) {
      clase.setNombre(claseDto.nombre);
      clase = await this.claseRepository.save(clase)

      if (clase) {
        return `OK  clase vieja --> ${claseVieja.getNombre()} clase nueva --> ${clase.getNombre()}`
      } else {
        return `No se pudo remplazar`
      }
    } else {
      return `no se encontro clase`
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let clase: Clase = await this.claseRepository.findOne(criterio);

      if (clase) {
        await this.claseRepository.remove(clase)
        return true;
      } else {
        throw new Error('no se encontro clase para eliminar')
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase - ' + error
      }, HttpStatus.NOT_FOUND)
    }
  }
}
