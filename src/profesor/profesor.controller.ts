import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}


  @Post('agregar-domicilio')
  addDomicilio(@Body() body: any): Promise<any> {
    return this.profesorService.createDomicilio(body);
  }

//CREATE
  @Post('crear')
  async create(@Body() createProfesorDto: CreateProfesorDto):Promise<any> {
    return await this.profesorService.create(createProfesorDto);
  }

  //READ
  @Get('obtenerTodos')
  findAll() {
    return this.profesorService.findAll();
  }

  //READ
  @Get('obtener/:id')
  findOne(@Param('id') id: number) {
    return this.profesorService.findOne(+id);
  }

  //UPDATE
  @Put('modificar/:id')
  async update(@Param('id') id: number, @Body() updateProfesorDto: CreateProfesorDto):Promise <any> {
    return await this.profesorService.update(+id, updateProfesorDto);
  }

  //DELETE
  @Delete('borrar/:id')
  async remove(@Param('id') id: number):Promise <any> {
    return await this.profesorService.remove(+id);
  }
}
