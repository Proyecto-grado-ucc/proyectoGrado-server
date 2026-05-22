import { PeriodoAcademico } from '../../compartido/entidades/periodo-academico.entidad';
export declare class Formulario {
    id: number;
    titulo: string;
    descripcion: string | null;
    periodo: PeriodoAcademico;
    activo: boolean;
    dimensiones: unknown[];
}
