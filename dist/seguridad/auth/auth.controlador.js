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
exports.AuthControlador = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_servicio_1 = require("./auth.servicio");
const login_dto_1 = require("./dto/login.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const respuesta_auth_dto_1 = require("./dto/respuesta-auth.dto");
const jwt_guardia_1 = require("./guardias/jwt.guardia");
const usuario_actual_decorador_1 = require("../decoradores/usuario-actual.decorador");
let AuthControlador = class AuthControlador {
    constructor(authServicio) {
        this.authServicio = authServicio;
    }
    login(dto, req) {
        const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
        return this.authServicio.login(dto, ip);
    }
    refrescar(dto) {
        return this.authServicio.refrescar(dto.refresh_token);
    }
    async logout(usuario) {
        await this.authServicio.logout(usuario.id);
    }
};
exports.AuthControlador = AuthControlador;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión y obtener tokens JWT' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: respuesta_auth_dto_1.RespuestaAuthDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthControlador.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Renovar access token usando refresh token' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { properties: { access_token: { type: 'string' } } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthControlador.prototype, "refrescar", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guardia_1.JwtGuardia),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cerrar sesión e invalidar tokens' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, usuario_actual_decorador_1.UsuarioActual)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthControlador.prototype, "logout", null);
exports.AuthControlador = AuthControlador = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_servicio_1.AuthServicio])
], AuthControlador);
//# sourceMappingURL=auth.controlador.js.map