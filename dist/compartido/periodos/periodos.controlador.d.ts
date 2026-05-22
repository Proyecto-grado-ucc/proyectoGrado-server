import { ActualizarPeriodoDto } from './dto/actualizar-periodo.dto';
import { CrearPeriodoDto } from './dto/crear-periodo.dto';
import { RespuestaPaginadaPeriodoDto, RespuestaPeriodoDto } from './dto/respuesta-periodo.dto';
import { PeriodosServicio } from './periodos.servicio';
export declare class PeriodosControlador {
    private readonly periodosServicio;
    constructor(periodosServicio: PeriodosServicio);
    crear(dto: CrearPeriodoDto): Promise<RespuestaPeriodoDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaPeriodoDto>;
    buscarPorId(id: number): Promise<RespuestaPeriodoDto>;
    actualizar(id: number, dto: ActualizarPeriodoDto): Promise<RespuestaPeriodoDto>;
    eliminar(id: number): Promise<void>;
}
