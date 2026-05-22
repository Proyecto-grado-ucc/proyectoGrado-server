import { Formulario } from './formulario.entidad';
export declare class Dimension {
    id: number;
    nombre: string;
    descripcion: string | null;
    peso: number;
    formulario: Formulario;
    preguntas: unknown[];
}
