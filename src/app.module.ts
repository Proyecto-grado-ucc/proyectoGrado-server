import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db', // 'db' es el nombre en docker-compose
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'tesis_db',
      autoLoadEntities: true,
      synchronize: true, // Esto crea las tablas automáticamente en desarrollo
    }),
    UsersModule,
  ],
})
export class AppModule { }
