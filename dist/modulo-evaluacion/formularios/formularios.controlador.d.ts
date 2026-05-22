import { ActualizarFormularioDto } from './dto/actualizar-formulario.dto';
import { CrearFormularioDto } from './dto/crear-formulario.dto';
import { RespuestaFormularioDto, RespuestaPaginadaFormularioDto } from './dto/respuesta-formulario.dto';
import { FormulariosServicio } from './formularios.servicio';
export declare class FormulariosControlador {
    private readonly formulariosServicio;
    constructor(formulariosServicio: FormulariosServicio);
    crear(dto: CrearFormularioDto): Promise<RespuestaFormularioDto>;
    listar(page?: number, size?: number): Promise<RespuestaPaginadaFormularioDto>;
    buscarPorId(id: number): Promise<RespuestaFormularioDto>;
    actualizar(id: number, dto: ActualizarFormularioDto): Promise<RespuestaFormularioDto>;
    eliminar(id: number): Promise<void>;
}
