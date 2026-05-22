import { Repository } from 'typeorm';
import { Alerta } from '../entidades/alerta.entidad';
import { RespuestaAlertaDto } from './dto/respuesta-alerta.dto';
export declare class AlertasServicio {
    private readonly alertaRepo;
    constructor(alertaRepo: Repository<Alerta>);
    listar(periodoId?: number): Promise<RespuestaAlertaDto[]>;
    marcarLeida(id: number): Promise<RespuestaAlertaDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
