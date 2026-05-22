import { Repository } from 'typeorm';
import { PeriodoAcademico } from '../entidades/periodo-academico.entidad';
import { ActualizarPeriodoDto } from './dto/actualizar-periodo.dto';
import { CrearPeriodoDto } from './dto/crear-periodo.dto';
import { RespuestaPaginadaPeriodoDto, RespuestaPeriodoDto } from './dto/respuesta-periodo.dto';
export declare class PeriodosServicio {
    private readonly periodoRepo;
    constructor(periodoRepo: Repository<PeriodoAcademico>);
    crear(dto: CrearPeriodoDto): Promise<RespuestaPeriodoDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaPeriodoDto>;
    buscarPorId(id: number): Promise<RespuestaPeriodoDto>;
    actualizar(id: number, dto: ActualizarPeriodoDto): Promise<RespuestaPeriodoDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
