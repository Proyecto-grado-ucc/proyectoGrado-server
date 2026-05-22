import { NivelAlerta, TipoAlerta } from '../../entidades/alerta.entidad';
export declare class RespuestaAlertaDto {
    id: number;
    docenteId: number;
    periodoId: number;
    tipo: TipoAlerta;
    nivel: NivelAlerta;
    mensaje: string;
    leida: boolean;
    creadoEn: Date;
}
