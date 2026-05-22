"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HorariosServicio_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorariosServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const periodo_academico_entidad_1 = require("../../compartido/entidades/periodo-academico.entidad");
const docente_entidad_1 = require("../../compartido/entidades/docente.entidad");
const algoritmo_genetico_1 = require("../motor/algoritmo-genetico");
const busqueda_tabu_1 = require("../motor/busqueda-tabu");
const gemini_servicio_1 = require("../motor/gemini.servicio");
const aula_entidad_1 = require("../entidades/aula.entidad");
const disponibilidad_entidad_1 = require("../entidades/disponibilidad.entidad");
const franja_horaria_entidad_1 = require("../entidades/franja-horaria.entidad");
const grupo_entidad_1 = require("../entidades/grupo.entidad");
const horario_entidad_1 = require("../entidades/horario.entidad");
let HorariosServicio = HorariosServicio_1 = class HorariosServicio {
    constructor(horarioRepo, periodoRepo, grupoRepo, docenteRepo, aulaRepo, franjaRepo, dispRepo, geminiServicio) {
        this.horarioRepo = horarioRepo;
        this.periodoRepo = periodoRepo;
        this.grupoRepo = grupoRepo;
        this.docenteRepo = docenteRepo;
        this.aulaRepo = aulaRepo;
        this.franjaRepo = franjaRepo;
        this.dispRepo = dispRepo;
        this.geminiServicio = geminiServicio;
        this.logger = new common_1.Logger(HorariosServicio_1.name);
    }
    async generar(dto) {
        const periodo = await this.periodoRepo.findOne({ where: { id: dto.periodoId } });
        if (!periodo)
            throw new common_1.NotFoundException(`Periodo ${dto.periodoId} no encontrado`);
        const entrada = await this.cargarEntrada();
        if (!entrada.grupos.length)
            throw new common_1.BadRequestException('No hay grupos registrados para generar horario');
        if (!entrada.docentes.length)
            throw new common_1.BadRequestException('No hay docentes registrados');
        if (!entrada.aulas.length)
            throw new common_1.BadRequestException('No hay aulas registradas');
        if (!entrada.franjas.length)
            throw new common_1.BadRequestException('No hay franjas horarias registradas');
        const configBase = await this.geminiServicio.sugerirConfiguracion(entrada);
        const config = { ...configBase, ...(dto.configuracion ?? {}) };
        const inicio = Date.now();
        const ag = new algoritmo_genetico_1.AlgoritmoGenetico(entrada, config);
        const { mejor: mejorAg, generaciones } = ag.evolucionar();
        const tabu = new busqueda_tabu_1.BusquedaTabu(entrada, config);
        const mejorFinal = tabu.refinar(mejorAg);
        const tiempoMs = Date.now() - inicio;
        this.logger.log(`Horario generado: fitness=${mejorFinal.fitness}, tiempo=${tiempoMs}ms`);
        const horario = this.horarioRepo.create({
            periodo,
            asignaciones: mejorFinal.genes,
            fitness: mejorFinal.fitness,
            generaciones,
            tiempoMs,
            metadatos: { fitnessAg: mejorAg.fitness, config },
        });
        return this.mapear(await this.horarioRepo.save(horario));
    }
    async listar(page, size) {
        const [items, total] = await this.horarioRepo.findAndCount({
            order: { creadoEn: 'DESC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map((h) => this.mapear(h)), total, page, size };
    }
    async buscarPorId(id) {
        const h = await this.horarioRepo.findOne({ where: { id } });
        if (!h)
            throw new common_1.NotFoundException(`Horario ${id} no encontrado`);
        return this.mapear(h);
    }
    async eliminar(id) {
        const h = await this.horarioRepo.findOne({ where: { id } });
        if (!h)
            throw new common_1.NotFoundException(`Horario ${id} no encontrado`);
        await this.horarioRepo.remove(h);
    }
    async cargarEntrada() {
        const [grupos, docentes, aulas, franjas, disponibilidades] = await Promise.all([
            this.grupoRepo.find(),
            this.docenteRepo.find(),
            this.aulaRepo.find({ where: { activa: true } }),
            this.franjaRepo.find(),
            this.dispRepo.find({ where: { disponible: true } }),
        ]);
        const dispPorDocente = new Map();
        for (const d of disponibilidades) {
            const arr = dispPorDocente.get(d.docente.id) ?? [];
            arr.push(d.franjaHoraria.id);
            dispPorDocente.set(d.docente.id, arr);
        }
        return {
            grupos: grupos.map((g) => ({ id: g.id, cupoMax: g.cupoMax, sesiones: g.curso.intensidadHoraria })),
            docentes: docentes.map((d) => ({
                id: d.id,
                cargaMaximaHoras: d.cargaMaximaHoras,
                franjasDisponibles: dispPorDocente.get(d.id) ?? [],
            })),
            aulas: aulas.map((a) => ({ id: a.id, capacidad: a.capacidad })),
            franjas: franjas.map((f) => ({ id: f.id })),
        };
    }
    mapear(h) {
        return {
            id: h.id,
            periodoId: h.periodo.id,
            periodoNombre: h.periodo.nombre,
            asignaciones: h.asignaciones,
            fitness: h.fitness,
            generaciones: h.generaciones,
            tiempoMs: h.tiempoMs,
            creadoEn: h.creadoEn,
        };
    }
};
exports.HorariosServicio = HorariosServicio;
exports.HorariosServicio = HorariosServicio = HorariosServicio_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(horario_entidad_1.Horario)),
    __param(1, (0, typeorm_1.InjectRepository)(periodo_academico_entidad_1.PeriodoAcademico)),
    __param(2, (0, typeorm_1.InjectRepository)(grupo_entidad_1.Grupo)),
    __param(3, (0, typeorm_1.InjectRepository)(docente_entidad_1.Docente)),
    __param(4, (0, typeorm_1.InjectRepository)(aula_entidad_1.Aula)),
    __param(5, (0, typeorm_1.InjectRepository)(franja_horaria_entidad_1.FranjaHoraria)),
    __param(6, (0, typeorm_1.InjectRepository)(disponibilidad_entidad_1.Disponibilidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        gemini_servicio_1.GeminiServicio])
], HorariosServicio);
//# sourceMappingURL=horarios.servicio.js.map