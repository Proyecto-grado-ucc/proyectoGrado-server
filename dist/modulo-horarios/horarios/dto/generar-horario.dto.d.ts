export declare class ConfiguracionMotorDto {
    tamPoblacion?: number;
    generaciones?: number;
    tasaMutacion?: number;
    tasaCruce?: number;
    iteracionesTabu?: number;
    tamListaTabu?: number;
}
export declare class GenerarHorarioDto {
    periodoId: number;
    configuracion?: ConfiguracionMotorDto;
}
