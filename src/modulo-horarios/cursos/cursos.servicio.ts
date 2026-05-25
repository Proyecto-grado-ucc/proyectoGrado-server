import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Curso } from '../entidades/curso.entidad';
import { NivelIdioma } from '../entidades/nivel-idioma.entidad';
import { ActualizarCursoDto } from './dto/actualizar-curso.dto';
import { CrearCursoDto } from './dto/crear-curso.dto';
import { RespuestaCursoDto, RespuestaPaginadaCursoDto } from './dto/respuesta-curso.dto';

@Injectable()
export class CursosServicio {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
    @InjectRepository(NivelIdioma)
    private readonly nivelRepo: Repository<NivelIdioma>,
    private readonly dataSource: DataSource,
  ) {}

  async crear(dto: CrearCursoDto): Promise<RespuestaCursoDto> {
    const nivel = await this.nivelRepo.findOne({ where: { id: dto.nivelId } });
    if (!nivel) throw new NotFoundException(`Nivel ${dto.nivelId} no encontrado`);

    const curso = this.cursoRepo.create({ nombre: dto.nombre, nivel, intensidadHoraria: dto.intensidadHoraria });
    return this.mapear(await this.cursoRepo.save(curso));
  }

  async listar(page: number, size: number): Promise<RespuestaPaginadaCursoDto> {
    const [items, total] = await this.cursoRepo.findAndCount({
      order: { nombre: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });
    return { items: items.map((c) => this.mapear(c)), total, page, size };
  }

  async buscarPorId(id: number): Promise<RespuestaCursoDto> {
    const c = await this.cursoRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException(`Curso ${id} no encontrado`);
    return this.mapear(c);
  }

  async actualizar(id: number, dto: ActualizarCursoDto): Promise<RespuestaCursoDto> {
    const c = await this.cursoRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException(`Curso ${id} no encontrado`);

    if (dto.nivelId !== undefined) {
      const nivel = await this.nivelRepo.findOne({ where: { id: dto.nivelId } });
      if (!nivel) throw new NotFoundException(`Nivel ${dto.nivelId} no encontrado`);
      c.nivel = nivel;
    }
    if (dto.nombre !== undefined) c.nombre = dto.nombre;
    if (dto.intensidadHoraria !== undefined) c.intensidadHoraria = dto.intensidadHoraria;

    return this.mapear(await this.cursoRepo.save(c));
  }

  async eliminar(id: number): Promise<void> {
    const c = await this.cursoRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException(`Curso ${id} no encontrado`);

    await this.dataSource.transaction(async (manager) => {
      const grupos = await manager.query('SELECT id FROM grupo WHERE curso_id = $1', [id]) as { id: number }[];
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

      await manager.query('DELETE FROM grupo WHERE curso_id = $1', [id]);
      await manager.delete(Curso, { id });
    });
  }

  private mapear(c: Curso): RespuestaCursoDto {
    return {
      id: c.id,
      nombre: c.nombre,
      nivelId: c.nivel.id,
      nivelCodigo: c.nivel.codigo,
      intensidadHoraria: c.intensidadHoraria,
    };
  }
}
