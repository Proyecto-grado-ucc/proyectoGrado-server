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
var AuthServicio_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServicio = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const sesion_entidad_1 = require("../entidades/sesion.entidad");
const usuario_entidad_1 = require("../entidades/usuario.entidad");
let AuthServicio = AuthServicio_1 = class AuthServicio {
    constructor(usuarioRepo, sesionRepo, jwtService, configService) {
        this.usuarioRepo = usuarioRepo;
        this.sesionRepo = sesionRepo;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthServicio_1.name);
    }
    async login(dto, ipOrigen) {
        const usuario = await this.usuarioRepo.findOne({
            where: { email: dto.email, activo: true },
            select: ['id', 'email', 'passwordHash', 'nombre', 'activo'],
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const contrasenaValida = await bcrypt.compare(dto.contrasena, usuario.passwordHash);
        if (!contrasenaValida) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const accessToken = this.firmarAcceso(usuario.id, usuario.email, usuario.rol.nombre);
        const refreshToken = this.firmarRefresco(usuario.id);
        const expiracionAcceso = this.calcularExpiracion(this.configService.get('JWT_EXPIRACION', '8h'));
        await this.sesionRepo.save(this.sesionRepo.create({
            usuario,
            tokenJwt: accessToken,
            fechaEmision: new Date(),
            fechaExpiracion: expiracionAcceso,
            ipOrigen: ipOrigen || null,
        }));
        return { access_token: accessToken, refresh_token: refreshToken, rol: usuario.rol.nombre };
    }
    async refrescar(refreshToken) {
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken);
        }
        catch {
            throw new common_1.UnauthorizedException('Token de refresco inválido o expirado');
        }
        if (payload.tipo !== 'refresco') {
            throw new common_1.UnauthorizedException('Token inválido para esta operación');
        }
        const usuario = await this.usuarioRepo.findOne({
            where: { id: payload.sub, activo: true },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuario no encontrado o inactivo');
        }
        const accessToken = this.firmarAcceso(usuario.id, usuario.email, usuario.rol.nombre);
        return { access_token: accessToken };
    }
    async logout(usuarioId) {
        await this.sesionRepo.update({ usuario: { id: usuarioId } }, { fechaExpiracion: new Date() });
    }
    async hashContrasena(contrasena) {
        const saltRounds = this.configService.get('BCRYPT_ROUNDS', 12);
        return bcrypt.hash(contrasena, saltRounds);
    }
    firmarAcceso(sub, email, rol) {
        return this.jwtService.sign({ sub, email, rol, tipo: 'acceso' }, { expiresIn: this.configService.get('JWT_EXPIRACION', '8h') });
    }
    firmarRefresco(sub) {
        return this.jwtService.sign({ sub, tipo: 'refresco' }, { expiresIn: this.configService.get('JWT_EXPIRACION_REFRESH', '7d') });
    }
    calcularExpiracion(duracion) {
        const ahora = Date.now();
        const unidades = { h: 3600_000, d: 86_400_000, m: 60_000 };
        const match = duracion.match(/^(\d+)([hmd])$/);
        if (!match)
            return new Date(ahora + 8 * 3600_000);
        return new Date(ahora + parseInt(match[1]) * (unidades[match[2]] ?? 3600_000));
    }
};
exports.AuthServicio = AuthServicio;
exports.AuthServicio = AuthServicio = AuthServicio_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entidad_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(sesion_entidad_1.Sesion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthServicio);
//# sourceMappingURL=auth.servicio.js.map