import { Injectable } from '@nestjs/common';
import { EscuelaDto } from './dto/escuelaDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EscuelaService {

  constructor(@InjectRepository(Escuela)
              private readonly escuelaRepository:Repository <Escuela>){}


  async create(createEscuelaDto: EscuelaDto):Promise <any> {
    let escuelaNueva:Escuela =  new Escuela(createEscuelaDto.nombre,createEscuelaDto.domicilio);
    return this.escuelaRepository.save(escuelaNueva)

  }

  async findAll() {
    return await this.escuelaRepository.find();
  }

  async findOne(id: number):Promise <any> {
    let criterio:FindOneOptions = { where : { id : id  } };
    let escuelaEncontrada:Escuela = await this.escuelaRepository.findOne(criterio);
    return escuelaEncontrada;
  }

  async update(id: number, updateEscuelaDto: EscuelaDto) {
    let criterio:FindOneOptions = { where : { id : id  } };
    let escuelaEncontrada:Escuela = await this.escuelaRepository.findOne(criterio);

    escuelaEncontrada.setNombre(updateEscuelaDto.nombre);
    escuelaEncontrada.setDomicilio(updateEscuelaDto.domicilio);

    return await this.escuelaRepository.save(escuelaEncontrada)
  }

  async remove(id: number):Promise <any> {
    let criterio:FindOneOptions = { where : { id : id  } };
    let escuelaEncontrada:Escuela = await this.escuelaRepository.findOne(criterio);

    return await this.escuelaRepository.remove(escuelaEncontrada)
  }
}
