import { Repository } from 'typeorm';
import { Dimension } from '../entidades/dimension.entidad';
import { Formulario } from '../entidades/formulario.entidad';
import { ActualizarDimensionDto } from './dto/actualizar-dimension.dto';
import { CrearDimensionDto } from './dto/crear-dimension.dto';
import { RespuestaDimensionDto, RespuestaPaginadaDimensionDto } from './dto/respuesta-dimension.dto';
export declare class DimensionesServicio {
    private readonly dimensionRepo;
    private readonly formularioRepo;
    constructor(dimensionRepo: Repository<Dimension>, formularioRepo: Repository<Formulario>);
    crear(dto: CrearDimensionDto): Promise<RespuestaDimensionDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaDimensionDto>;
    buscarPorId(id: number): Promise<RespuestaDimensionDto>;
    actualizar(id: number, dto: ActualizarDimensionDto): Promise<RespuestaDimensionDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
