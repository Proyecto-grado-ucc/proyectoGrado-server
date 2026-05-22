import { DashboardServicio } from './dashboard.servicio';
import { RespuestaDashboardDto } from './dto/respuesta-dashboard.dto';
export declare class DashboardControlador {
    private readonly dashboardServicio;
    constructor(dashboardServicio: DashboardServicio);
    resumen(periodoId: number): Promise<RespuestaDashboardDto>;
}
