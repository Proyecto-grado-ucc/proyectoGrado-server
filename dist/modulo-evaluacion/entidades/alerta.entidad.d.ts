export declare enum TipoAlerta {
    BAJO_RENDIMIENTO = "BAJO_RENDIMIENTO",
    MEJORA_NOTABLE = "MEJORA_NOTABLE",
    SIN_EVALUACIONES = "SIN_EVALUACIONES"
}
export declare enum NivelAlerta {
    INFO = "INFO",
    ADVERTENCIA = "ADVERTENCIA",
    CRITICO = "CRITICO"
}
export declare class Alerta {
    id: number;
    docenteId: number;
    periodoId: number;
    tipo: TipoAlerta;
    nivel: NivelAlerta;
    mensaje: string;
    leida: boolean;
    creadoEn: Date;
}
