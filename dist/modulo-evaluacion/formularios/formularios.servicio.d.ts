import { Repository } from 'typeorm';
import { PeriodoAcademico } from '../../compartido/entidades/periodo-academico.entidad';
import { Formulario } from '../entidades/formulario.entidad';
import { ActualizarFormularioDto } from './dto/actualizar-formulario.dto';
import { CrearFormularioDto } from './dto/crear-formulario.dto';
import { RespuestaFormularioDto, RespuestaPaginadaFormularioDto } from './dto/respuesta-formulario.dto';
export declare class FormulariosServicio {
    private readonly formularioRepo;
    private readonly periodoRepo;
    constructor(formularioRepo: Repository<Formulario>, periodoRepo: Repository<PeriodoAcademico>);
    crear(dto: CrearFormularioDto): Promise<RespuestaFormularioDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaFormularioDto>;
    buscarPorId(id: number): Promise<RespuestaFormularioDto>;
    actualizar(id: number, dto: ActualizarFormularioDto): Promise<RespuestaFormularioDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
