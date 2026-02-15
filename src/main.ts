import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from 'src/app.module';
import { AppConfig } from 'src/config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: true,
  });
  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest JS Apps API')
    .setDescription('Nest JS Apps API documentation')
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');
  const port = appConfig.port;
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  logger.log('\x1b[96m' + 'Application started successfully' + '\x1b[0m');
  logger.log('\x1b[96m' + `listening on ${port}` + '\x1b[0m');
  logger.log(
    '\x1b[96m' +
      `Swagger API documentation on http://localhost:${port}/api-docs` +
      '\x1b[0m',
  );

  await app.listen(port);
}

void bootstrap();
