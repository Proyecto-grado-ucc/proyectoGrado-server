import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CompletarEvaluacionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  estudianteId: number;

  @ApiProperty({ required: false, nullable: true, maxLength: 1000 })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  comentario?: string | null;
}
