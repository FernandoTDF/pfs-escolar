import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaDto } from './dto/escuelaDto';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  //CREATE
  @Post('crear')
  async create(@Body() createEscuelaDto: EscuelaDto):Promise <any> {
    return await this.escuelaService.create(createEscuelaDto);
  }

  //READ
  @Get('obtener')
  async findAll() {
    return await this.escuelaService.findAll();
  }

  //READ
  @Get('obtener/:id')
  findOne(@Param('id') id: string) {
    return this.escuelaService.findOne(+id);
  }

  //UPDATE
  @Put('modificar/:id')
  async update(@Param('id') id: string, @Body() updateEscuelaDto: EscuelaDto): Promise <any> {
    return this.escuelaService.update(+id, updateEscuelaDto);
  }

  //DELETE
  @Delete('borrar/:id')
  async remove(@Param('id') id: string):Promise <any> {
    return await this.escuelaService.remove(+id);
  }
}
