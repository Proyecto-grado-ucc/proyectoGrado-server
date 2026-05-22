import { Curso } from './curso.entidad';
export declare enum Jornada {
    Manana = "MANANA",
    Tarde = "TARDE",
    Noche = "NOCHE"
}
export declare class Grupo {
    id: number;
    codigo: string;
    curso: Curso;
    cupoMax: number;
    jornada: Jornada;
}
