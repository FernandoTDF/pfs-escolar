import { Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository: Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository: Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository: Repository<EstudianteClase>
  ) { }




  async create(estudianteDto: EstudianteDto) {

    //const fecha = new Date();

    const estudiante: Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fecha_nacimiento));

    if (estudiante) {
      return `se creo estudiante ${estudiante.nombre}}`
    } else {
      return `no se creo estudiante`
    }
  };



  /* async createConRelacion(estudianteDto: EstudianteDto): Promise<boolean> {

    const clase: Clase = await this.claseRepository.findOne({ where: { id: 3 } })

    let estudiante: Estudiante = new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fecha_nacimiento)

    if (clase) {
      estudiante.clases = [clase];
      await this.estudianteRepository.save(estudiante)
    }
    if (estudiante) {  
      return true;
    } else{
      return false;
    }
  }
 */ // este servicio creaba con realcion a la clase que asisitia el estud??


 async addClase(body): Promise<any>{

  const claseId = body.claseId;
  const estudianteId = body.estudianteId;
  console.log("el Id de estudiante es =" + estudianteId);
  console.log("el Id de la clase es =" + claseId);


    //consultar si el estudiante existe
    const estudiante:Estudiante = await this.estudianteRepository.findOne({where : {id:estudianteId}})

    if(!estudiante){
      return `error - no se encuentra el estudiante con id ${estudianteId}`
    }

    const clase:Clase = await this.claseRepository.findOne({where : {id:claseId}})

    if(!clase){
      return `error - no se encuentra la clase con id ${claseId}`
    }

    const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId, estudianteId:estudianteId}});

    if(clase_estudiante)
      return `error - el estudiante ya tiene asignada esa clase`;
    return await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId));







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
