import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { RespuestaHorarioDto, RespuestaPaginadaHorarioDto } from './dto/respuesta-horario.dto';
import { HorariosServicio } from './horarios.servicio';
export declare class HorariosControlador {
    private readonly horariosServicio;
    constructor(horariosServicio: HorariosServicio);
    generar(dto: GenerarHorarioDto): Promise<RespuestaHorarioDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaHorarioDto>;
    buscarPorId(id: number): Promise<RespuestaHorarioDto>;
    eliminar(id: number): Promise<void>;
}
