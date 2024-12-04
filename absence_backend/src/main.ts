import { NestFactory } from '@nestjs/core';
import { config } from './config/secrets';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './auth/error/error.global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  app.use(cookieParser())
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(config.port);
}
bootstrap();
