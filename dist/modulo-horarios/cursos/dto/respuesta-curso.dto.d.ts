export declare class RespuestaCursoDto {
    id: number;
    nombre: string;
    nivelId: number;
    nivelCodigo: string;
    intensidadHoraria: number;
}
export declare class RespuestaPaginadaCursoDto {
    items: RespuestaCursoDto[];
    total: number;
    page: number;
    size: number;
}
