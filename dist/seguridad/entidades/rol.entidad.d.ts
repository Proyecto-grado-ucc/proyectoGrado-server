export declare enum RolNombre {
    Admin = "Admin",
    Docente = "Docente",
    Estudiante = "Estudiante"
}
export declare class Rol {
    id: number;
    nombre: string;
    descripcion: string | null;
    usuarios: unknown[];
    permisos: unknown[];
}
