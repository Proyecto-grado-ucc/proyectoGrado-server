import { DimensionesServicio } from './dimensiones.servicio';
import { ActualizarDimensionDto } from './dto/actualizar-dimension.dto';
import { CrearDimensionDto } from './dto/crear-dimension.dto';
import { RespuestaDimensionDto, RespuestaPaginadaDimensionDto } from './dto/respuesta-dimension.dto';
export declare class DimensionesControlador {
    private readonly dimensionesServicio;
    constructor(dimensionesServicio: DimensionesServicio);
    crear(dto: CrearDimensionDto): Promise<RespuestaDimensionDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaDimensionDto>;
    buscarPorId(id: number): Promise<RespuestaDimensionDto>;
    actualizar(id: number, dto: ActualizarDimensionDto): Promise<RespuestaDimensionDto>;
    eliminar(id: number): Promise<void>;
}
