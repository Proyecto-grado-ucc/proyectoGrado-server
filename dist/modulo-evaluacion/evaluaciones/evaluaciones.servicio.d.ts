import { Repository } from 'typeorm';
import { Docente } from '../../compartido/entidades/docente.entidad';
import { Evaluacion } from '../entidades/evaluacion.entidad';
import { Formulario } from '../entidades/formulario.entidad';
import { ActualizarEvaluacionDto } from './dto/actualizar-evaluacion.dto';
import { CrearEvaluacionDto } from './dto/crear-evaluacion.dto';
import { RespuestaEvaluacionDto, RespuestaPaginadaEvaluacionDto } from './dto/respuesta-evaluacion.dto';
export declare class EvaluacionesServicio {
    private readonly evaluacionRepo;
    private readonly formularioRepo;
    private readonly docenteRepo;
    constructor(evaluacionRepo: Repository<Evaluacion>, formularioRepo: Repository<Formulario>, docenteRepo: Repository<Docente>);
    crear(dto: CrearEvaluacionDto): Promise<RespuestaEvaluacionDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaEvaluacionDto>;
    buscarPorId(id: number): Promise<RespuestaEvaluacionDto>;
    actualizar(id: number, dto: ActualizarEvaluacionDto): Promise<RespuestaEvaluacionDto>;
    eliminar(id: number): Promise<void>;
    private mapear;
}
