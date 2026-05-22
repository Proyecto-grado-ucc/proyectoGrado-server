import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModulo } from './app.modulo';
import { validarConfiguracionProduccion } from './configuracion/validar-produccion';
import { LoggerJson } from './core/logger/logger-json';

function obtenerOrigenesCors(): string[] | boolean {
  const origenes = process.env.CORS_ORIGINS?.split(',')
    .map((origen) => origen.trim())
    .filter(Boolean);

  if (origenes?.length) return origenes;
  return process.env.NODE_ENV === 'production' ? [] : true;
}

async function arrancar() {
  validarConfiguracionProduccion();

  const logger = new LoggerJson();
  const app = await NestFactory.create(AppModulo, { logger });

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: obtenerOrigenesCors(),
    credentials: true,
  });

  const configuracionSwagger = new DocumentBuilder()
    .setTitle('Sistema CAL — API')
    .setDescription('Cambridge Academy of Languages — API REST')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const documento = SwaggerModule.createDocument(app, configuracionSwagger);
  SwaggerModule.setup('api/docs', app, documento);

  const puerto = Number(process.env.PORT || 3000);
  await app.listen(puerto, '0.0.0.0');
  logger.log(`Servidor escuchando en puerto ${puerto} con prefijo /api`, 'Bootstrap');
  logger.log('Documentacion disponible en /api/docs', 'Bootstrap');
}

arrancar();
