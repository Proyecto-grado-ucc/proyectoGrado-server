import { ConfiguracionMotor, Cromosoma, EntradaMotor } from './tipos';
export declare class BusquedaTabu {
    private readonly entrada;
    private readonly config;
    private listaTabu;
    constructor(entrada: EntradaMotor, config: ConfiguracionMotor);
    refinar(inicial: Cromosoma): Cromosoma;
    private generarVecinos;
    private esTabu;
}
