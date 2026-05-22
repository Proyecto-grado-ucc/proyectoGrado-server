export declare enum DiaSemana {
    Lunes = "LUN",
    Martes = "MAR",
    Miercoles = "MIE",
    Jueves = "JUE",
    Viernes = "VIE",
    Sabado = "SAB"
}
export declare class FranjaHoraria {
    id: number;
    diaSemana: DiaSemana;
    horaInicio: string;
    horaFin: string;
    bloqueIdx: number;
}
