export declare class RespuestaDimensionDto {
    id: number;
    nombre: string;
    descripcion: string | null;
    peso: number;
    formularioId: number;
    formularioTitulo: string;
}
export declare class RespuestaPaginadaDimensionDto {
    items: RespuestaDimensionDto[];
    total: number;
    page: number;
    size: number;
}
