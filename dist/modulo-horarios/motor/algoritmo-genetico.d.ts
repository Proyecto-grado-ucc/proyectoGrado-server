import { ConfiguracionMotor, Cromosoma, EntradaMotor } from './tipos';
export declare class AlgoritmoGenetico {
    private readonly entrada;
    private readonly config;
    private poblacion;
    constructor(entrada: EntradaMotor, config: ConfiguracionMotor);
    private inicializar;
    private seleccionTorneo;
    private cruzar;
    private mutar;
    evolucionar(): {
        mejor: Cromosoma;
        generaciones: number;
    };
}
