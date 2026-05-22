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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuloHorariosModulo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const docente_entidad_1 = require("../compartido/entidades/docente.entidad");
const periodo_academico_entidad_1 = require("../compartido/entidades/periodo-academico.entidad");
const seguridad_modulo_1 = require("../seguridad/seguridad.modulo");
const aulas_controlador_1 = require("./aulas/aulas.controlador");
const aulas_servicio_1 = require("./aulas/aulas.servicio");
const cursos_controlador_1 = require("./cursos/cursos.controlador");
const cursos_servicio_1 = require("./cursos/cursos.servicio");
const disponibilidades_controlador_1 = require("./disponibilidades/disponibilidades.controlador");
const disponibilidades_servicio_1 = require("./disponibilidades/disponibilidades.servicio");
const aula_entidad_1 = require("./entidades/aula.entidad");
const curso_entidad_1 = require("./entidades/curso.entidad");
const disponibilidad_entidad_1 = require("./entidades/disponibilidad.entidad");
const franja_horaria_entidad_1 = require("./entidades/franja-horaria.entidad");
const grupo_entidad_1 = require("./entidades/grupo.entidad");
const horario_entidad_1 = require("./entidades/horario.entidad");
const nivel_idioma_entidad_1 = require("./entidades/nivel-idioma.entidad");
const franjas_controlador_1 = require("./franjas/franjas.controlador");
const franjas_servicio_1 = require("./franjas/franjas.servicio");
const grupos_controlador_1 = require("./grupos/grupos.controlador");
const grupos_servicio_1 = require("./grupos/grupos.servicio");
const horarios_controlador_1 = require("./horarios/horarios.controlador");
const horarios_servicio_1 = require("./horarios/horarios.servicio");
const gemini_servicio_1 = require("./motor/gemini.servicio");
const niveles_controlador_1 = require("./niveles/niveles.controlador");
const niveles_servicio_1 = require("./niveles/niveles.servicio");
let ModuloHorariosModulo = class ModuloHorariosModulo {
    constructor(nivelRepo) {
        this.nivelRepo = nivelRepo;
    }
    async onModuleInit() {
        await this.sembrarNiveles();
    }
    async sembrarNiveles() {
        const niveles = [
            { codigo: nivel_idioma_entidad_1.CodigoNivel.A1, nombre: 'Principiante' },
            { codigo: nivel_idioma_entidad_1.CodigoNivel.A2, nombre: 'Elemental' },
            { codigo: nivel_idioma_entidad_1.CodigoNivel.B1, nombre: 'Intermedio' },
            { codigo: nivel_idioma_entidad_1.CodigoNivel.B2, nombre: 'Intermedio Alto' },
            { codigo: nivel_idioma_entidad_1.CodigoNivel.C1, nombre: 'Avanzado' },
        ];
        for (const nivel of niveles) {
            const existe = await this.nivelRepo.findOne({ where: { codigo: nivel.codigo } });
            if (!existe)
                await this.nivelRepo.save(this.nivelRepo.create(nivel));
        }
    }
};
exports.ModuloHorariosModulo = ModuloHorariosModulo;
exports.ModuloHorariosModulo = ModuloHorariosModulo = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([
                aula_entidad_1.Aula, nivel_idioma_entidad_1.NivelIdioma, curso_entidad_1.Curso, grupo_entidad_1.Grupo, franja_horaria_entidad_1.FranjaHoraria, disponibilidad_entidad_1.Disponibilidad,
                horario_entidad_1.Horario, docente_entidad_1.Docente, periodo_academico_entidad_1.PeriodoAcademico,
            ]),
            seguridad_modulo_1.SeguridadModulo,
        ],
        providers: [
            aulas_servicio_1.AulasServicio, niveles_servicio_1.NivelesServicio, cursos_servicio_1.CursosServicio, grupos_servicio_1.GruposServicio,
            franjas_servicio_1.FranjasServicio, disponibilidades_servicio_1.DisponibilidadesServicio,
            gemini_servicio_1.GeminiServicio, horarios_servicio_1.HorariosServicio,
        ],
        controllers: [
            aulas_controlador_1.AulasControlador, niveles_controlador_1.NivelesControlador, cursos_controlador_1.CursosControlador, grupos_controlador_1.GruposControlador,
            franjas_controlador_1.FranjasControlador, disponibilidades_controlador_1.DisponibilidadesControlador, horarios_controlador_1.HorariosControlador,
        ],
        exports: [niveles_servicio_1.NivelesServicio, cursos_servicio_1.CursosServicio, grupos_servicio_1.GruposServicio, franjas_servicio_1.FranjasServicio, disponibilidades_servicio_1.DisponibilidadesServicio, horarios_servicio_1.HorariosServicio],
    }),
    __param(0, (0, typeorm_1.InjectRepository)(nivel_idioma_entidad_1.NivelIdioma)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ModuloHorariosModulo);
//# sourceMappingURL=modulo-horarios.modulo.js.map