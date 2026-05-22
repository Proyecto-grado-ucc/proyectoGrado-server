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
var GeminiServicio_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiServicio = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const tipos_1 = require("./tipos");
let GeminiServicio = GeminiServicio_1 = class GeminiServicio {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(GeminiServicio_1.name);
    }
    async sugerirConfiguracion(entrada) {
        const apiKey = this.config.get('GEMINI_API_KEY');
        if (!apiKey) {
            this.logger.warn('GEMINI_API_KEY no configurada — usando parámetros por defecto');
            return tipos_1.CONFIG_DEFAULT;
        }
        try {
            const { GoogleGenerativeAI } = await Promise.resolve().then(() => require('@google/generative-ai'));
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            const prompt = `Eres un experto en optimización combinatoria.
Dado un problema de generación de horarios académicos con:
- ${entrada.grupos.length} grupos (sesiones totales: ${entrada.grupos.reduce((s, g) => s + g.sesiones, 0)})
- ${entrada.docentes.length} docentes disponibles
- ${entrada.aulas.length} aulas
- ${entrada.franjas.length} franjas horarias

Sugiere parámetros óptimos para un algoritmo genético + búsqueda tabú.
Responde ÚNICAMENTE con un JSON válido con esta estructura exacta:
{"tamPoblacion":50,"generaciones":100,"tasaMutacion":0.1,"tasaCruce":0.8,"iteracionesTabu":50,"tamListaTabu":20}`;
            const resultado = await model.generateContent(prompt);
            const texto = resultado.response.text().trim();
            const jsonMatch = texto.match(/\{[^}]+\}/);
            if (!jsonMatch)
                throw new Error('Respuesta de Gemini sin JSON válido');
            const sugerido = JSON.parse(jsonMatch[0]);
            return { ...tipos_1.CONFIG_DEFAULT, ...sugerido };
        }
        catch (err) {
            this.logger.error('Error al consultar Gemini, usando config por defecto', err);
            return tipos_1.CONFIG_DEFAULT;
        }
    }
};
exports.GeminiServicio = GeminiServicio;
exports.GeminiServicio = GeminiServicio = GeminiServicio_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiServicio);
//# sourceMappingURL=gemini.servicio.js.map