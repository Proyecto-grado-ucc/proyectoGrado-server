import { Repository } from 'typeorm';
import { PeriodoAcademico } from '../../compartido/entidades/periodo-academico.entidad';
import { Docente } from '../../compartido/entidades/docente.entidad';
import { GeminiServicio } from '../motor/gemini.servicio';
import { Aula } from '../entidades/aula.entidad';
import { Disponibilidad } from '../entidades/disponibilidad.entidad';
import { FranjaHoraria } from '../entidades/franja-horaria.entidad';
import { Grupo } from '../entidades/grupo.entidad';
import { Horario } from '../entidades/horario.entidad';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { RespuestaHorarioDto, RespuestaPaginadaHorarioDto } from './dto/respuesta-horario.dto';
export declare class HorariosServicio {
    private readonly horarioRepo;
    private readonly periodoRepo;
    private readonly grupoRepo;
    private readonly docenteRepo;
    private readonly aulaRepo;
    private readonly franjaRepo;
    private readonly dispRepo;
    private readonly geminiServicio;
    private readonly logger;
    constructor(horarioRepo: Repository<Horario>, periodoRepo: Repository<PeriodoAcademico>, grupoRepo: Repository<Grupo>, docenteRepo: Repository<Docente>, aulaRepo: Repository<Aula>, franjaRepo: Repository<FranjaHoraria>, dispRepo: Repository<Disponibilidad>, geminiServicio: GeminiServicio);
    generar(dto: GenerarHorarioDto): Promise<RespuestaHorarioDto>;
    listar(page: number, size: number): Promise<RespuestaPaginadaHorarioDto>;
    buscarPorId(id: number): Promise<RespuestaHorarioDto>;
    eliminar(id: number): Promise<void>;
    private cargarEntrada;
    private mapear;
}
