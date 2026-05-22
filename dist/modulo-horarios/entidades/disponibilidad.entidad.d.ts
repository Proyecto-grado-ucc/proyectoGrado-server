import { Docente } from '../../compartido/entidades/docente.entidad';
import { FranjaHoraria } from './franja-horaria.entidad';
export declare class Disponibilidad {
    id: number;
    docente: Docente;
    franjaHoraria: FranjaHoraria;
    disponible: boolean;
}
