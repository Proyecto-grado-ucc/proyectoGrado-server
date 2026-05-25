import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Dimension } from '../entidades/dimension.entidad';
import { Formulario } from '../entidades/formulario.entidad';
import { DimensionesServicio } from './dimensiones.servicio';

const mockFormulario = (): Formulario => ({ id: 1, titulo: 'Eval', descripcion: null, periodo: { id: 1, nombre: '2024-I', fechaInicio: '', fechaFin: '' }, activo: true, dimensiones: [] }) as unknown as Formulario;
const mockDimension = (): Dimension => ({ id: 1, nombre: 'Metodología', descripcion: null, peso: 1.0, formulario: mockFormulario(), preguntas: [] }) as unknown as Dimension;

describe('DimensionesServicio', () => {
  let servicio: DimensionesServicio;
  let dimensionRepo: { findOne: jest.Mock; findAndCount: jest.Mock; create: jest.Mock; save: jest.Mock; remove: jest.Mock };
  let formularioRepo: { findOne: jest.Mock };
  let dataSource: { transaction: jest.Mock };
  let manager: { query: jest.Mock; delete: jest.Mock };

  beforeEach(async () => {
    dimensionRepo = { findOne: jest.fn(), findAndCount: jest.fn(), create: jest.fn(), save: jest.fn(), remove: jest.fn() };
    formularioRepo = { findOne: jest.fn() };
    manager = { query: jest.fn(), delete: jest.fn() };
    dataSource = { transaction: jest.fn(async (callback) => callback(manager)) };

    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        DimensionesServicio,
        { provide: getRepositoryToken(Dimension), useValue: dimensionRepo },
        { provide: getRepositoryToken(Formulario), useValue: formularioRepo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();
    servicio = modulo.get(DimensionesServicio);
  });

  it('crear lanza NotFoundException si el formulario no existe', async () => {
    formularioRepo.findOne.mockResolvedValue(null);
    await expect(servicio.crear({ nombre: 'Test', formularioId: 99 })).rejects.toThrow(NotFoundException);
  });

  it('crear devuelve la dimensión', async () => {
    formularioRepo.findOne.mockResolvedValue(mockFormulario());
    const d = mockDimension();
    dimensionRepo.create.mockReturnValue(d);
    dimensionRepo.save.mockResolvedValue(d);
    const r = await servicio.crear({ nombre: 'Metodología', formularioId: 1 });
    expect(r.nombre).toBe('Metodología');
  });

  it('buscarPorId lanza NotFoundException si no existe', async () => {
    dimensionRepo.findOne.mockResolvedValue(null);
    await expect(servicio.buscarPorId(99)).rejects.toThrow(NotFoundException);
  });

  it('eliminar funciona correctamente', async () => {
    dimensionRepo.findOne.mockResolvedValue(mockDimension());
    await expect(servicio.eliminar(1)).resolves.not.toThrow();
    expect(dataSource.transaction).toHaveBeenCalledTimes(1);
    expect(manager.query).toHaveBeenCalledWith('DELETE FROM pregunta WHERE dimension_id = $1', [1]);
    expect(manager.delete).toHaveBeenCalledWith(Dimension, { id: 1 });
  });
});
