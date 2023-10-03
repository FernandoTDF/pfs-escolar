import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Clase } from 'src/clase/entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Clase])], //se inporta las entidades que van a cumplir con los requerimientos d eun recurso
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
