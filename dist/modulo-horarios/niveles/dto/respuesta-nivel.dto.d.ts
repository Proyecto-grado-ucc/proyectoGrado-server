import { CodigoNivel } from '../../entidades/nivel-idioma.entidad';
export declare class RespuestaNivelDto {
    id: number;
    codigo: CodigoNivel;
    nombre: string;
}
export declare class RespuestaPaginadaNivelDto {
    items: RespuestaNivelDto[];
    total: number;
    page: number;
    size: number;
}
