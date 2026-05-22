import { Repository } from 'typeorm';
import { Docente } from '../../compartido/entidades/docente.entidad';
import { Alerta } from '../entidades/alerta.entidad';
import { Evaluacion } from '../entidades/evaluacion.entidad';
import { ResultadoKdd } from '../entidades/resultado-kdd.entidad';
import { RespuestaDashboardDto } from './dto/respuesta-dashboard.dto';
export declare class DashboardServicio {
    private readonly docenteRepo;
    private readonly evalRepo;
    private readonly resultadoRepo;
    private readonly alertaRepo;
    constructor(docenteRepo: Repository<Docente>, evalRepo: Repository<Evaluacion>, resultadoRepo: Repository<ResultadoKdd>, alertaRepo: Repository<Alerta>);
    resumen(periodoId: number): Promise<RespuestaDashboardDto>;
}
