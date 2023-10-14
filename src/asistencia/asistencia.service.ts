import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudiante_clase.entity';

@Injectable()
export class AsistenciaService {


  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(EstudianteClase)
    private readonly estudianteClaseRepository: Repository<EstudianteClase>

  ) { }

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const { estudianteId, claseId } = createAsistenciaDto;

    console.log("estudianteId =" + estudianteId)
    console.log("estudianteId =" + claseId)

    const asistencia_estudiante = await this.estudianteClaseRepository.findOne({ where: { estudianteId: estudianteId, claseId: claseId } });

    if (!asistencia_estudiante) {
      return `no existe estudiante clase`
    } else {
      return await this.asistenciaRepository.save(new Asistencia(claseId, estudianteId, new Date()))
    }







  }

  findAll() {
    return `This action returns all asistencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}
