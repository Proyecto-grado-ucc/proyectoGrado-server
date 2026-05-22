import { Repository } from 'typeorm';
import { NivelIdioma } from '../entidades/nivel-idioma.entidad';
import { ActualizarNivelDto } from './dto/actualizar-nivel.dto';
import { CrearNivelDto } from './dto/crear-nivel.dto';
import { RespuestaNivelDto, RespuestaPaginadaNivelDto } from './dto/respuesta-nivel.dto';
export declare class NivelesServicio {
    private readonly nivelRepo;
    constructor(nivelRepo: Repository<NivelIdioma>);
    crear(dto: CrearNivelDto): Promise<RespuestaNivelDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaNivelDto>;
    buscarPorId(id: number): Promise<RespuestaNivelDto>;
    actualizar(id: number, dto: ActualizarNivelDto): Promise<RespuestaNivelDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
