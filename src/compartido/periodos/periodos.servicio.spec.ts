import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { PeriodoAcademico } from '../entidades/periodo-academico.entidad';
import { PeriodosServicio } from './periodos.servicio';

const mockPeriodo = (): PeriodoAcademico =>
  ({ id: 1, nombre: '2026-II', fechaInicio: '2026-08-01', fechaFin: '2026-12-15' }) as PeriodoAcademico;

describe('PeriodosServicio', () => {
  let servicio: PeriodosServicio;
  let repo: { findOne: jest.Mock; findAndCount: jest.Mock; create: jest.Mock; save: jest.Mock; remove: jest.Mock };
  let dataSource: { transaction: jest.Mock };
  let manager: { query: jest.Mock; delete: jest.Mock };

  beforeEach(async () => {
    repo = {
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    manager = {
      query: jest.fn(),
      delete: jest.fn(),
    };
    dataSource = {
      transaction: jest.fn(async (callback) => callback(manager)),
    };

    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodosServicio,
        { provide: getRepositoryToken(PeriodoAcademico), useValue: repo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    servicio = modulo.get(PeriodosServicio);
  });

  describe('crear', () => {
    it('crea y devuelve el periodo', async () => {
      const p = mockPeriodo();
      repo.create.mockReturnValue(p);
      repo.save.mockResolvedValue(p);

      const resultado = await servicio.crear({ nombre: '2026-II', fechaInicio: '2026-08-01', fechaFin: '2026-12-15' });
      expect(resultado.nombre).toBe('2026-II');
    });

    it('rechaza periodos con fecha de inicio en el pasado', async () => {
      await expect(
        servicio.crear({ nombre: '2024-I', fechaInicio: '2024-01-15', fechaFin: '2024-06-30' }),
      ).rejects.toThrow(BadRequestException);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('rechaza periodos con fecha de fin anterior al inicio', async () => {
      await expect(
        servicio.crear({ nombre: '2026-II', fechaInicio: '2026-08-01', fechaFin: '2026-07-31' }),
      ).rejects.toThrow(BadRequestException);
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('listar', () => {
    it('devuelve paginado correctamente', async () => {
      repo.findAndCount.mockResolvedValue([[mockPeriodo()], 1]);
      const resultado = await servicio.listar(1, 20);
      expect(resultado.total).toBe(1);
      expect(resultado.items).toHaveLength(1);
    });
  });

  describe('buscarPorId', () => {
    it('lanza NotFoundException si no existe', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(servicio.buscarPorId(99)).rejects.toThrow(NotFoundException);
    });

    it('devuelve el periodo si existe', async () => {
      repo.findOne.mockResolvedValue(mockPeriodo());
      const resultado = await servicio.buscarPorId(1);
      expect(resultado.id).toBe(1);
    });
  });

  describe('actualizar', () => {
    it('lanza NotFoundException si no existe', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(servicio.actualizar(99, { nombre: 'X' })).rejects.toThrow(NotFoundException);
    });

    it('actualiza y devuelve el periodo', async () => {
      const p = mockPeriodo();
      repo.findOne.mockResolvedValue(p);
      repo.save.mockResolvedValue({ ...p, nombre: '2024-II' });
      const resultado = await servicio.actualizar(1, { nombre: '2024-II' });
      expect(resultado.nombre).toBe('2024-II');
    });

    it('rechaza actualizar la fecha de inicio a una fecha pasada', async () => {
      repo.findOne.mockResolvedValue(mockPeriodo());
      await expect(servicio.actualizar(1, { fechaInicio: '2024-01-15' })).rejects.toThrow(BadRequestException);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('rechaza actualizar a un rango de fechas incoherente', async () => {
      repo.findOne.mockResolvedValue(mockPeriodo());
      await expect(servicio.actualizar(1, { fechaFin: '2026-07-31' })).rejects.toThrow(BadRequestException);
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('eliminar', () => {
    it('lanza NotFoundException si no existe', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(servicio.eliminar(99)).rejects.toThrow(NotFoundException);
    });

    it('elimina el periodo correctamente', async () => {
      repo.findOne.mockResolvedValue(mockPeriodo());
      await expect(servicio.eliminar(1)).resolves.not.toThrow();
      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
      expect(manager.query).toHaveBeenCalledWith('DELETE FROM alerta WHERE periodo_id = $1', [1]);
      expect(manager.query).toHaveBeenCalledWith('DELETE FROM resultado_kdd WHERE periodo_id = $1', [1]);
      expect(manager.query).toHaveBeenCalledWith('DELETE FROM horario WHERE periodo_id = $1', [1]);
      expect(manager.delete).toHaveBeenCalledWith(PeriodoAcademico, { id: 1 });
    });
  });
});
