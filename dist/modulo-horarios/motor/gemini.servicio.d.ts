import { ConfigService } from '@nestjs/config';
import { ConfiguracionMotor, EntradaMotor } from './tipos';
export declare class GeminiServicio {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    sugerirConfiguracion(entrada: EntradaMotor): Promise<ConfiguracionMotor>;
}
