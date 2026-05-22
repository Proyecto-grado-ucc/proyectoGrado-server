export declare enum TipoAula {
    Salon = "SALON",
    Lab = "LAB",
    Virtual = "VIRTUAL"
}
export declare class Aula {
    id: number;
    codigo: string;
    capacidad: number;
    tipo: TipoAula;
    activa: boolean;
}
