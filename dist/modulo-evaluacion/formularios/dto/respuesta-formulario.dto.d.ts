export declare class RespuestaFormularioDto {
    id: number;
    titulo: string;
    descripcion: string | null;
    periodoId: number;
    periodoNombre: string;
    activo: boolean;
}
export declare class RespuestaPaginadaFormularioDto {
    items: RespuestaFormularioDto[];
    total: number;
    page: number;
    size: number;
}
