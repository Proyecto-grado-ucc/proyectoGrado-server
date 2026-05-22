"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_modulo_1 = require("./app.modulo");
const logger_json_1 = require("./core/logger/logger-json");
async function arrancar() {
    const logger = new logger_json_1.LoggerJson();
    const app = await core_1.NestFactory.create(app_modulo_1.AppModulo, { logger });
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: process.env.CORS_ORIGINS?.split(',') ?? 'http://localhost:3000',
        credentials: true,
    });
    const configuracionSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Sistema CAL — API')
        .setDescription('Cambridge Academy of Languages — API REST')
        .setVersion('0.1.0')
        .addBearerAuth()
        .build();
    const documento = swagger_1.SwaggerModule.createDocument(app, configuracionSwagger);
    swagger_1.SwaggerModule.setup('api/docs', app, documento);
    const puerto = process.env.PORT ?? 3000;
    await app.listen(puerto);
    logger.log(`Servidor en http://localhost:${puerto}/api`, 'Bootstrap');
    logger.log(`Documentación en http://localhost:${puerto}/api/docs`, 'Bootstrap');
}
arrancar();
//# sourceMappingURL=main.js.map