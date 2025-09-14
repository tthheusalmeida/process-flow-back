import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrls = process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(',').map((url) => url.trim())
    : ['http://localhost:3000'];

  app.enableCors({
    origin: frontendUrls,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: process.env.CORS_CREDENTIALS === 'true',
  });

  const port = process.env.PORT || 8080;

  console.log(`Server running on port ${port}`);

  await app.listen(port);
}
bootstrap();
