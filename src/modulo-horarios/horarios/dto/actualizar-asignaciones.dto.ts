import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

export class AsignacionItemDto {
  @ApiProperty() @IsInt() grupoId: number;
  @ApiProperty() @IsInt() docenteId: number;
  @ApiProperty() @IsInt() aulaId: number;
  @ApiProperty() @IsInt() franjaId: number;
}

export class ActualizarAsignacionesDto {
  @ApiProperty({ type: [AsignacionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AsignacionItemDto)
  asignaciones: AsignacionItemDto[];
}
