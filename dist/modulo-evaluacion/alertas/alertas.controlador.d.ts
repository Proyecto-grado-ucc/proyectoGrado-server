import { AlertasServicio } from './alertas.servicio';
import { RespuestaAlertaDto } from './dto/respuesta-alerta.dto';
export declare class AlertasControlador {
    private readonly alertasServicio;
    constructor(alertasServicio: AlertasServicio);
    listar(periodoId?: number): Promise<RespuestaAlertaDto[]>;
    marcarLeida(id: number): Promise<RespuestaAlertaDto>;
    eliminar(id: number): Promise<void>;
}
