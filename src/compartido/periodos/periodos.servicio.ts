import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PeriodoAcademico } from '../entidades/periodo-academico.entidad';
import { ActualizarPeriodoDto } from './dto/actualizar-periodo.dto';
import { CrearPeriodoDto } from './dto/crear-periodo.dto';
import { RespuestaPaginadaPeriodoDto, RespuestaPeriodoDto } from './dto/respuesta-periodo.dto';

@Injectable()
export class PeriodosServicio {
  constructor(
    @InjectRepository(PeriodoAcademico)
    private readonly periodoRepo: Repository<PeriodoAcademico>,
    private readonly dataSource: DataSource,
  ) {}

  async crear(dto: CrearPeriodoDto): Promise<RespuestaPeriodoDto> {
    this.validarFechas(dto.fechaInicio, dto.fechaFin, true);
    const periodo = this.periodoRepo.create(dto);
    return this.mapear(await this.periodoRepo.save(periodo));
  }

  async listar(page: number, size: number): Promise<RespuestaPaginadaPeriodoDto> {
    const [items, total] = await this.periodoRepo.findAndCount({
      order: { fechaInicio: 'DESC' },
      skip: (page - 1) * size,
      take: size,
    });
    return { items: items.map((p) => this.mapear(p)), total, page, size };
  }

  async buscarPorId(id: number): Promise<RespuestaPeriodoDto> {
    const p = await this.periodoRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Periodo ${id} no encontrado`);
    return this.mapear(p);
  }

  async actualizar(id: number, dto: ActualizarPeriodoDto): Promise<RespuestaPeriodoDto> {
    const p = await this.periodoRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Periodo ${id} no encontrado`);
    this.validarFechas(dto.fechaInicio ?? p.fechaInicio, dto.fechaFin ?? p.fechaFin, dto.fechaInicio !== undefined);
    Object.assign(p, dto);
    return this.mapear(await this.periodoRepo.save(p));
  }

  async eliminar(id: number): Promise<void> {
    const p = await this.periodoRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException(`Periodo ${id} no encontrado`);

    await this.dataSource.transaction(async (manager) => {
      await manager.query('DELETE FROM alerta WHERE periodo_id = $1', [id]);
      await manager.query('DELETE FROM resultado_kdd WHERE periodo_id = $1', [id]);
      await manager.query('DELETE FROM horario WHERE periodo_id = $1', [id]);

      await manager.query(
        `DELETE FROM respuesta
         WHERE evaluacion_id IN (
           SELECT e.id
           FROM evaluacion e
           INNER JOIN formulario f ON f.id = e.formulario_id
           WHERE f.periodo_id = $1
         )`,
        [id],
      );
      await manager.query(
        `DELETE FROM evaluacion
         WHERE formulario_id IN (
           SELECT id FROM formulario WHERE periodo_id = $1
         )`,
        [id],
      );
      await manager.query(
        `DELETE FROM pregunta
         WHERE dimension_id IN (
           SELECT d.id
           FROM dimension d
           INNER JOIN formulario f ON f.id = d.formulario_id
           WHERE f.periodo_id = $1
         )`,
        [id],
      );
      await manager.query(
        `DELETE FROM dimension
         WHERE formulario_id IN (
           SELECT id FROM formulario WHERE periodo_id = $1
         )`,
        [id],
      );
      await manager.query('DELETE FROM formulario WHERE periodo_id = $1', [id]);
      await manager.delete(PeriodoAcademico, { id });
    });
  }

  private mapear(p: PeriodoAcademico): RespuestaPeriodoDto {
    return { id: p.id, nombre: p.nombre, fechaInicio: p.fechaInicio, fechaFin: p.fechaFin };
  }

  private validarFechas(fechaInicio: string, fechaFin: string, validarInicioNoPasado: boolean): void {
    if (validarInicioNoPasado && fechaInicio < this.hoyColombia()) {
      throw new BadRequestException('La fecha de inicio del periodo no puede estar en el pasado');
    }

    if (fechaFin < fechaInicio) {
      throw new BadRequestException('La fecha de fin del periodo debe ser mayor o igual a la fecha de inicio');
    }
  }

  private hoyColombia(): string {
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());

    const obtener = (tipo: string) => partes.find((parte) => parte.type === tipo)?.value ?? '';
    return `${obtener('year')}-${obtener('month')}-${obtener('day')}`;
  }
}
