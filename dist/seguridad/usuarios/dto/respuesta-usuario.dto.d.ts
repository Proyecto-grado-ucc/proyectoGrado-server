export declare class RespuestaUsuarioDto {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    activo: boolean;
    fechaCreacion: Date;
}
export declare class RespuestaPaginadaUsuarioDto {
    items: RespuestaUsuarioDto[];
    total: number;
    page: number;
    size: number;
}
