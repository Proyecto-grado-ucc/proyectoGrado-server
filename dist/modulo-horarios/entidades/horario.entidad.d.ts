import { PeriodoAcademico } from '../../compartido/entidades/periodo-academico.entidad';
import { Asignacion } from '../motor/tipos';
export declare class Horario {
    id: number;
    periodo: PeriodoAcademico;
    asignaciones: Asignacion[];
    fitness: number;
    generaciones: number;
    tiempoMs: number;
    metadatos: Record<string, unknown> | null;
    creadoEn: Date;
}
