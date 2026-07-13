import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Best Gelo API')
    .setDescription('API completa para gestão de pedidos de gelo - Best Gelo Comércio de Gelo LTDA')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .addTag('Auth', 'Autenticação de clientes')
    .addTag('Auth - Admin', 'Autenticação de administradores')
    .addTag('Products', 'Catálogo de produtos (público)')
    .addTag('Products - Admin', 'Gestão de produtos (admin)')
    .addTag('Orders', 'Pedidos do cliente')
    .addTag('Orders - Admin', 'Gestão de pedidos (admin)')
    .addTag('Customers - Admin', 'Gestão de clientes (admin)')
    .addTag('Dashboard - Admin', 'Dashboard administrativo')
    .addTag('Integrations', 'Integrações externas (WhatsApp, Maps)')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });

  // Prisma shutdown hook
  const prismaService = app.get(PrismaService);
  app.enableShutdownHooks();

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Best Gelo API running on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();