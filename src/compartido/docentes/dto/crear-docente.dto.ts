import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CrearDocenteDto {
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  usuarioId?: number;

  @ApiProperty({ example: 'Juan Perez', required: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  usuarioNombre?: string;

  @ApiProperty({ example: 'juan@cal.edu.co', required: false })
  @IsEmail({}, { message: 'El email no es valido' })
  @IsOptional()
  usuarioEmail?: string;

  @ApiProperty({ example: 'Inglés Avanzado', required: false, nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  especialidad?: string;

  @ApiProperty({ example: 40, default: 40, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  cargaMaximaHoras?: number;
}
