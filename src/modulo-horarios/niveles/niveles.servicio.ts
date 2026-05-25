import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { NivelIdioma } from '../entidades/nivel-idioma.entidad';
import { ActualizarNivelDto } from './dto/actualizar-nivel.dto';
import { CrearNivelDto } from './dto/crear-nivel.dto';
import { RespuestaNivelDto, RespuestaPaginadaNivelDto } from './dto/respuesta-nivel.dto';

@Injectable()
export class NivelesServicio {
  constructor(
    @InjectRepository(NivelIdioma)
    private readonly nivelRepo: Repository<NivelIdioma>,
    private readonly dataSource: DataSource,
  ) {}

  async crear(dto: CrearNivelDto): Promise<RespuestaNivelDto> {
    const existe = await this.nivelRepo.findOne({ where: { codigo: dto.codigo } });
    if (existe) throw new ConflictException(`Ya existe un nivel con el código ${dto.codigo}`);

    const nivel = this.nivelRepo.create(dto);
    return this.mapear(await this.nivelRepo.save(nivel));
  }

  async listar(page: number, size: number): Promise<RespuestaPaginadaNivelDto> {
    const [items, total] = await this.nivelRepo.findAndCount({
      order: { codigo: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });
    return { items: items.map((n) => this.mapear(n)), total, page, size };
  }

  async buscarPorId(id: number): Promise<RespuestaNivelDto> {
    const n = await this.nivelRepo.findOne({ where: { id } });
    if (!n) throw new NotFoundException(`Nivel ${id} no encontrado`);
    return this.mapear(n);
  }

  async actualizar(id: number, dto: ActualizarNivelDto): Promise<RespuestaNivelDto> {
    const n = await this.nivelRepo.findOne({ where: { id } });
    if (!n) throw new NotFoundException(`Nivel ${id} no encontrado`);

    if (dto.codigo && dto.codigo !== n.codigo) {
      const duplicado = await this.nivelRepo.findOne({ where: { codigo: dto.codigo } });
      if (duplicado) throw new ConflictException(`El código ${dto.codigo} ya está en uso`);
    }

    Object.assign(n, dto);
    return this.mapear(await this.nivelRepo.save(n));
  }

  async eliminar(id: number): Promise<void> {
    const n = await this.nivelRepo.findOne({ where: { id } });
    if (!n) throw new NotFoundException(`Nivel ${id} no encontrado`);

    await this.dataSource.transaction(async (manager) => {
      const grupos = await manager.query(
        `SELECT g.id
         FROM grupo g
         INNER JOIN curso c ON c.id = g.curso_id
         WHERE c.nivel_id = $1`,
        [id],
      ) as { id: number }[];
      const grupoIds = grupos.map((g) => g.id);

      if (grupoIds.length > 0) {
        await manager.query(
          `DELETE FROM horario
           WHERE EXISTS (
             SELECT 1
             FROM jsonb_array_elements(asignaciones) AS asignacion
             WHERE (asignacion->>'grupoId')::int = ANY($1::int[])
           )`,
          [grupoIds],
        );
        await manager.query('UPDATE estudiante SET grupo_id = NULL WHERE grupo_id = ANY($1::int[])', [grupoIds]);
      }

      await manager.query(
        `DELETE FROM grupo
         WHERE curso_id IN (
           SELECT id FROM curso WHERE nivel_id = $1
         )`,
        [id],
      );
      await manager.query('DELETE FROM curso WHERE nivel_id = $1', [id]);
      await manager.delete(NivelIdioma, { id });
    });
  }

  private mapear(n: NivelIdioma): RespuestaNivelDto {
    return { id: n.id, codigo: n.codigo, nombre: n.nombre };
  }
}
