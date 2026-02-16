import { NestFactory } from '@nestjs/core';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Duck Hunt')
    .setDescription('Duck Hunt server')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('duck-hunt-ws', {
      url: 'ws://localhost:3001',
      protocol: 'socket.io',
    })
    .build();

  const asyncapiDocument = AsyncApiModule.createDocument(app, asyncApiOptions);

  app.getHttpAdapter().get('/asyncapi.json', (_, res) => {
    res.type('application/json').send(asyncapiDocument);
  });

  await AsyncApiModule.setup('/', app, asyncapiDocument);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Server is running on port 3001');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });
