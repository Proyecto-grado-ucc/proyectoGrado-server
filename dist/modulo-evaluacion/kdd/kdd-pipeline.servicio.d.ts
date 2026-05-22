import { Repository } from 'typeorm';
import { Docente } from '../../compartido/entidades/docente.entidad';
import { Alerta } from '../entidades/alerta.entidad';
import { Evaluacion } from '../entidades/evaluacion.entidad';
import { ResultadoKdd } from '../entidades/resultado-kdd.entidad';
import { Respuesta } from '../entidades/respuesta.entidad';
import { RespuestaEjecucionKddDto, RespuestaResultadoKddDto } from './dto/respuesta-kdd.dto';
export declare class KddPipelineServicio {
    private readonly evalRepo;
    private readonly respRepo;
    private readonly resultadoRepo;
    private readonly alertaRepo;
    private readonly docenteRepo;
    constructor(evalRepo: Repository<Evaluacion>, respRepo: Repository<Respuesta>, resultadoRepo: Repository<ResultadoKdd>, alertaRepo: Repository<Alerta>, docenteRepo: Repository<Docente>);
    ejecutar(periodoId: number): Promise<RespuestaEjecucionKddDto>;
    listarResultados(periodoId: number): Promise<RespuestaResultadoKddDto[]>;
}
