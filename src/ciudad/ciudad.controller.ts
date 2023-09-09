import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './entities/dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {

  constructor(private readonly ciudadService:CiudadService){}
  
  @Get('raw')
  async getAllRaw():Promise<CiudadDTO[]>{
    return await this.ciudadService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm():Promise<CiudadDTO[]>{
    return await this.ciudadService.findAllOrm();
  }

  @Get(':id')
  async getId(@Param('id')id:number) : Promise<CiudadDTO>{
    return await this.ciudadService.findById(id);
  }

  @Post('crear')
  async crearCiudad(@Body() ciudad:CiudadDTO):Promise<CiudadDTO>{
    return this.ciudadService.create(ciudad);
  }






}
