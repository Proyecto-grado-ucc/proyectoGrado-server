import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Asignacion } from '../../motor/tipos';

export class ActualizarAsignacionesHorarioDto {
  @ApiProperty({ type: Array })
  @IsArray()
  asignaciones: Asignacion[];
}
