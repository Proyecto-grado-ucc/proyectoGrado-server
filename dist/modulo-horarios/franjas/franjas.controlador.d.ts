import { ActualizarFranjaDto } from './dto/actualizar-franja.dto';
import { CrearFranjaDto } from './dto/crear-franja.dto';
import { RespuestaFranjaDto, RespuestaPaginadaFranjaDto } from './dto/respuesta-franja.dto';
import { FranjasServicio } from './franjas.servicio';
export declare class FranjasControlador {
    private readonly franjasServicio;
    constructor(franjasServicio: FranjasServicio);
    crear(dto: CrearFranjaDto): Promise<RespuestaFranjaDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaFranjaDto>;
    buscarPorId(id: number): Promise<RespuestaFranjaDto>;
    actualizar(id: number, dto: ActualizarFranjaDto): Promise<RespuestaFranjaDto>;
    eliminar(id: number): Promise<void>;
}
