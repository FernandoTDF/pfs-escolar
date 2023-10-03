import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ClaseModule } from './clase/clase.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { EstudianteModule } from './estudiante/estudiante.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "db_colegio",
    "entities": [__dirname + "/**/**/**.entity{.ts,.js}"],
    "synchronize":true //modifica db a medida que damos guardar, se impacta en la base de datos. Solo en modo desarrollador.
    // En modo produccion, tenemos acceso a la db de produccion, y si borramos aca, se borra en la db tambien.


  }),
  CiudadModule,
  ClaseModule,
  ProfesorModule,
  EscuelaModule,
  EstudianteModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
