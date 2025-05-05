import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,          // Automatically transforms types (e.g., string to number)
    whitelist: true,          // Strips properties not in the DTO
    forbidNonWhitelisted: true, // (optional) Throws an error if extra props are provided
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
