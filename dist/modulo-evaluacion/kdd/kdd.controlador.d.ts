import { EjecutarKddDto } from './dto/ejecutar-kdd.dto';
import { RespuestaEjecucionKddDto, RespuestaResultadoKddDto } from './dto/respuesta-kdd.dto';
import { KddPipelineServicio } from './kdd-pipeline.servicio';
export declare class KddControlador {
    private readonly kddServicio;
    constructor(kddServicio: KddPipelineServicio);
    ejecutar(dto: EjecutarKddDto): Promise<RespuestaEjecucionKddDto>;
    listarResultados(periodoId: number): Promise<RespuestaResultadoKddDto[]>;
}
