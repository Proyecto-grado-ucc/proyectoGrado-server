import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MatricularEstudianteDto {
  @ApiProperty({ example: 'G-01-2026A' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  codigoAcceso: string;
}
