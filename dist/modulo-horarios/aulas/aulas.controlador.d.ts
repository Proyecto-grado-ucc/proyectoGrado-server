import { AulasServicio } from './aulas.servicio';
import { ActualizarAulaDto } from './dto/actualizar-aula.dto';
import { CrearAulaDto } from './dto/crear-aula.dto';
import { RespuestaAulaDto, RespuestaPaginadaAulaDto } from './dto/respuesta-aula.dto';
export declare class AulasControlador {
    private readonly aulasServicio;
    constructor(aulasServicio: AulasServicio);
    crear(dto: CrearAulaDto): Promise<RespuestaAulaDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaAulaDto>;
    buscarPorId(id: number): Promise<RespuestaAulaDto>;
    actualizar(id: number, dto: ActualizarAulaDto): Promise<RespuestaAulaDto>;
    eliminar(id: number): Promise<void>;
}
