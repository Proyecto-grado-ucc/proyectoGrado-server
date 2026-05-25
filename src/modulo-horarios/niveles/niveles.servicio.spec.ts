import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { CodigoNivel, NivelIdioma } from '../entidades/nivel-idioma.entidad';
import { NivelesServicio } from './niveles.servicio';

const mockNivel = (): NivelIdioma =>
  ({ id: 1, codigo: CodigoNivel.A1, nombre: 'Principiante' }) as NivelIdioma;

describe('NivelesServicio', () => {
  let servicio: NivelesServicio;
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
      query: jest.fn().mockResolvedValue([]),
      delete: jest.fn(),
    };
    dataSource = {
      transaction: jest.fn(async (callback) => callback(manager)),
    };

    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        NivelesServicio,
        { provide: getRepositoryToken(NivelIdioma), useValue: repo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    servicio = modulo.get(NivelesServicio);
  });

  describe('crear', () => {
    it('crea el nivel correctamente', async () => {
      repo.findOne.mockResolvedValue(null);
      const n = mockNivel();
      repo.create.mockReturnValue(n);
      repo.save.mockResolvedValue(n);

      const resultado = await servicio.crear({ codigo: CodigoNivel.A1, nombre: 'Principiante' });
      expect(resultado.codigo).toBe(CodigoNivel.A1);
    });

    it('lanza ConflictException si el código ya existe', async () => {
      repo.findOne.mockResolvedValue(mockNivel());
      await expect(servicio.crear({ codigo: CodigoNivel.A1, nombre: 'X' })).rejects.toThrow(ConflictException);
    });
  });

  describe('buscarPorId', () => {
    it('lanza NotFoundException si no existe', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(servicio.buscarPorId(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('eliminar', () => {
    it('elimina correctamente', async () => {
      repo.findOne.mockResolvedValue(mockNivel());
      await expect(servicio.eliminar(1)).resolves.not.toThrow();
      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
      expect(manager.query).toHaveBeenCalledWith(
        expect.stringContaining('FROM grupo g'),
        [1],
      );
      expect(manager.query).toHaveBeenCalledWith('DELETE FROM curso WHERE nivel_id = $1', [1]);
      expect(manager.delete).toHaveBeenCalledWith(NivelIdioma, { id: 1 });
    });

    it('limpia horarios y estudiantes cuando el nivel tiene grupos', async () => {
      repo.findOne.mockResolvedValue(mockNivel());
      manager.query.mockResolvedValueOnce([{ id: 10 }, { id: 11 }]);

      await servicio.eliminar(1);

      expect(manager.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM horario'), [[10, 11]]);
      expect(manager.query).toHaveBeenCalledWith('UPDATE estudiante SET grupo_id = NULL WHERE grupo_id = ANY($1::int[])', [[10, 11]]);
    });
  });
});
