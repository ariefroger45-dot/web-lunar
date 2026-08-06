import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://web-lunar-go9f.vercel.app', // ganti sesuai URL frontend kamu
    ],
  });
  await app.listen(3001);
}
bootstrap();
