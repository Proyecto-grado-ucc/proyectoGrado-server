import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { crearOpcionesTypeOrm } from './configuracion/typeorm.config';

export default new DataSource(crearOpcionesTypeOrm());
