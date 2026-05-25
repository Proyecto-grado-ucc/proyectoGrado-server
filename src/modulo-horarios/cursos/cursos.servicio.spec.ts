import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Curso } from '../entidades/curso.entidad';
import { CodigoNivel, NivelIdioma } from '../entidades/nivel-idioma.entidad';
import { CursosServicio } from './cursos.servicio';

const mockNivel = (): NivelIdioma =>
  ({ id: 1, codigo: CodigoNivel.A1, nombre: 'Principiante' }) as NivelIdioma;

const mockCurso = (): Curso =>
  ({ id: 1, nombre: 'Inglés A1', nivel: mockNivel(), intensidadHoraria: 4 }) as unknown as Curso;

describe('CursosServicio', () => {
  let servicio: CursosServicio;
  let cursoRepo: { findOne: jest.Mock; findAndCount: jest.Mock; create: jest.Mock; save: jest.Mock; remove: jest.Mock };
  let nivelRepo: { findOne: jest.Mock };
  let dataSource: { transaction: jest.Mock };
  let manager: { query: jest.Mock; delete: jest.Mock };

  beforeEach(async () => {
    cursoRepo = {
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };
    nivelRepo = { findOne: jest.fn() };
    manager = { query: jest.fn().mockResolvedValue([]), delete: jest.fn() };
    dataSource = { transaction: jest.fn(async (callback) => callback(manager)) };

    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        CursosServicio,
        { provide: getRepositoryToken(Curso), useValue: cursoRepo },
        { provide: getRepositoryToken(NivelIdioma), useValue: nivelRepo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    servicio = modulo.get(CursosServicio);
  });

  describe('crear', () => {
    it('crea el curso cuando el nivel existe', async () => {
      nivelRepo.findOne.mockResolvedValue(mockNivel());
      const c = mockCurso();
      cursoRepo.create.mockReturnValue(c);
      cursoRepo.save.mockResolvedValue(c);

      const resultado = await servicio.crear({ nombre: 'Inglés A1', nivelId: 1, intensidadHoraria: 4 });
      expect(resultado.nombre).toBe('Inglés A1');
    });

    it('lanza NotFoundException si el nivel no existe', async () => {
      nivelRepo.findOne.mockResolvedValue(null);
      await expect(servicio.crear({ nombre: 'Test', nivelId: 99, intensidadHoraria: 4 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('buscarPorId', () => {
    it('lanza NotFoundException si no existe', async () => {
      cursoRepo.findOne.mockResolvedValue(null);
      await expect(servicio.buscarPorId(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('eliminar', () => {
    it('elimina correctamente', async () => {
      cursoRepo.findOne.mockResolvedValue(mockCurso());
      await expect(servicio.eliminar(1)).resolves.not.toThrow();
      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
      expect(manager.query).toHaveBeenCalledWith('DELETE FROM grupo WHERE curso_id = $1', [1]);
      expect(manager.delete).toHaveBeenCalledWith(Curso, { id: 1 });
    });
  });
});
