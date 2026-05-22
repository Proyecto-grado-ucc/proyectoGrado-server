import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuardia } from '../../seguridad/auth/guardias/jwt.guardia';
import { RolesGuardia } from '../../seguridad/auth/guardias/roles.guardia';
import { Auditar } from '../../seguridad/decoradores/auditar.decorador';
import { Roles } from '../../seguridad/decoradores/roles.decorador';
import { RolNombre } from '../../seguridad/entidades/rol.entidad';
import { ActualizarAsignacionesHorarioDto } from './dto/actualizar-asignaciones-horario.dto';
import { GenerarHorarioDto } from './dto/generar-horario.dto';
import { RespuestaHorarioDto, RespuestaPaginadaHorarioDto } from './dto/respuesta-horario.dto';
import { HorariosServicio } from './horarios.servicio';

@ApiTags('horarios')
@ApiBearerAuth()
@UseGuards(JwtGuardia, RolesGuardia)
@Roles(RolNombre.Admin)
@Controller('horarios')
export class HorariosControlador {
  constructor(private readonly horariosServicio: HorariosServicio) {}

  @Post('generar')
  @Auditar('HORARIO')
  @ApiOperation({ summary: 'Generar horario con AG + Búsqueda Tabú + Gemini' })
  @ApiResponse({ status: 201, type: RespuestaHorarioDto })
  generar(@Body() dto: GenerarHorarioDto): Promise<RespuestaHorarioDto> {
    return this.horariosServicio.generar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar horarios generados paginado' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'size', required: false, example: 20 })
  @ApiQuery({ name: 'archivado', required: false, example: false })
  @ApiResponse({ status: 200, type: RespuestaPaginadaHorarioDto })
  listar(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('size', new ParseIntPipe({ optional: true })) size = 20,
    @Query('archivado', new ParseBoolPipe({ optional: true })) archivado?: boolean,
  ): Promise<RespuestaPaginadaHorarioDto> {
    return this.horariosServicio.listar(page, size, archivado);
  }

  @Post('archivar-todos')
  @Auditar('HORARIO')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Archivar todos los horarios activos' })
  @ApiResponse({ status: 204 })
  archivarTodos(): Promise<void> {
    return this.horariosServicio.archivarTodos();
  }

  @Delete('historial')
  @Auditar('HORARIO')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar horarios archivados' })
  @ApiResponse({ status: 204 })
  eliminarHistorial(): Promise<void> {
    return this.horariosServicio.eliminarHistorial();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener horario por ID' })
  @ApiResponse({ status: 200, type: RespuestaHorarioDto })
  buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<RespuestaHorarioDto> {
    return this.horariosServicio.buscarPorId(id);
  }

  @Patch(':id/asignaciones')
  @Auditar('HORARIO')
  @ApiOperation({ summary: 'Actualizar asignaciones de un horario' })
  @ApiResponse({ status: 200, type: RespuestaHorarioDto })
  actualizarAsignaciones(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarAsignacionesHorarioDto,
  ): Promise<RespuestaHorarioDto> {
    return this.horariosServicio.actualizarAsignaciones(id, dto);
  }

  @Delete(':id')
  @Auditar('HORARIO')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar horario' })
  @ApiResponse({ status: 204 })
  eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.horariosServicio.eliminar(id);
  }
}
