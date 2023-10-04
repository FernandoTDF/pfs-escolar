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

  async findAllRaw(): Promise<CiudadDTO[]> {
    let datos = await this.ciudadRepository.query("select * from ciudad");

    this.ciudades = [];
    datos.forEach(element => {
      let ciudad: Ciudad = new Ciudad(element['nombre']);
      this.ciudades.push(ciudad)
    });
    return this.ciudades;
  }

  async findAllOrm(): Promise<CiudadDTO[]> {
    return await this.ciudadRepository.find()
  }

  async findById(id: number): Promise<CiudadDTO> {
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

  async create(CiudadDTO: CiudadDTO): Promise<CiudadDTO> {

    //     let ciudad : Ciudad = new Ciudad(CiudadDTO.nombre)
    //  return await this.ciudadRepository.save(ciudad); -->primer prueba (retorna un objeto "Ciudad")

    //    return await this.ciudadRepository.save(new Ciudad(CiudadDTO.nombre)); --> segunda prueba (retorna un objeto "Ciudad")
    try {
      let ciudad: Ciudad = await this.ciudadRepository.save(new Ciudad(CiudadDTO.nombre));


      if (ciudad)
        return CiudadDTO;
      else
        throw new Error('No se pudo crear la ciudad');
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'error en ciudad' + error
      }, HttpStatus.NOT_FOUND)
    }
    // min 1:47:15
  }


  async update(ciudadDTO: CiudadDTO, id: number): Promise<string> {
    const criterio: FindOneOptions = { where: { id: id } };
    let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
    let ciudadvieja = ciudad.getNombre();

    if (!ciudad)
      throw new Error('no se pudo encontrar la ciudad a moficiar');
    else
      ciudad.setNombre(ciudadDTO.nombre);
    ciudad = await this.ciudadRepository.save(ciudad)
    return `OK  ciudad vieja --> ${ciudadvieja} ciudad nueva --> ${ciudadDTO.nombre}`

  }

  async delete(id: number): Promise<any> {
    const criterio: FindOneOptions = { where: { id: id } };
    let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);

    if (!ciudad) {
      throw new Error('no se pudo encontrar la ciudad a eliminar');
    } else {
      await this.ciudadRepository.remove(ciudad);
      return {
        "id": id,
        "messaje": 'se elimino de forma exitosa'
      }
    }
  }
}
