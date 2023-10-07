import { Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { MongoNetworkTimeoutError, Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
  private estudianteRepository: Repository<Estudiante>) { }




  async create(estudianteDto: EstudianteDto) {

    const fecha = new Date();

    const estudiante: Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fecha_nacimiento));

    if (estudiante) {
      return `se creo estudiante ${estudiante.nombre}}`
    } else {
      return `no se creo estudiante`
    }
  }




  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, estudianteDto: EstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
