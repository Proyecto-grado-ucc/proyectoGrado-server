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
exports.UsuariosServicio = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rol_entidad_1 = require("../entidades/rol.entidad");
const usuario_entidad_1 = require("../entidades/usuario.entidad");
const auth_servicio_1 = require("../auth/auth.servicio");
let UsuariosServicio = class UsuariosServicio {
    constructor(usuarioRepo, rolRepo, authServicio) {
        this.usuarioRepo = usuarioRepo;
        this.rolRepo = rolRepo;
        this.authServicio = authServicio;
    }
    async crear(dto) {
        const existe = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (existe) {
            throw new common_1.ConflictException(`Ya existe un usuario con el email ${dto.email}`);
        }
        const rol = await this.rolRepo.findOne({ where: { nombre: dto.rol } });
        if (!rol) {
            throw new common_1.NotFoundException(`Rol '${dto.rol}' no encontrado`);
        }
        const passwordHash = await this.authServicio.hashContrasena(dto.contrasena);
        const usuario = this.usuarioRepo.create({
            nombre: dto.nombre,
            email: dto.email,
            passwordHash,
            rol,
            activo: dto.activo ?? true,
        });
        const guardado = await this.usuarioRepo.save(usuario);
        return this.mapearRespuesta(guardado);
    }
    async listar(page, size) {
        const [items, total] = await this.usuarioRepo.findAndCount({
            order: { fechaCreacion: 'DESC' },
            skip: (page - 1) * size,
            take: size,
        });
        return { items: items.map(this.mapearRespuesta), total, page, size };
    }
    async buscarPorId(id) {
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${id} no encontrado`);
        return this.mapearRespuesta(usuario);
    }
    async actualizar(id, dto) {
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${id} no encontrado`);
        if (dto.email && dto.email !== usuario.email) {
            const duplicado = await this.usuarioRepo.findOne({ where: { email: dto.email } });
            if (duplicado)
                throw new common_1.ConflictException(`El email ${dto.email} ya está en uso`);
            usuario.email = dto.email;
        }
        if (dto.nombre)
            usuario.nombre = dto.nombre;
        if (dto.activo !== undefined)
            usuario.activo = dto.activo;
        if (dto.rol) {
            const rol = await this.rolRepo.findOne({ where: { nombre: dto.rol } });
            if (!rol)
                throw new common_1.NotFoundException(`Rol '${dto.rol}' no encontrado`);
            usuario.rol = rol;
        }
        if (dto.contrasena) {
            usuario.passwordHash = await this.authServicio.hashContrasena(dto.contrasena);
        }
        const actualizado = await this.usuarioRepo.save(usuario);
        return this.mapearRespuesta(actualizado);
    }
    async eliminar(id) {
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario ${id} no encontrado`);
        await this.usuarioRepo.remove(usuario);
    }
    mapearRespuesta(usuario) {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol?.nombre ?? '',
            activo: usuario.activo,
            fechaCreacion: usuario.fechaCreacion,
        };
    }
};
exports.UsuariosServicio = UsuariosServicio;
exports.UsuariosServicio = UsuariosServicio = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entidad_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entidad_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        auth_servicio_1.AuthServicio])
], UsuariosServicio);
//# sourceMappingURL=usuarios.servicio.js.map