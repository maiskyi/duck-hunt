import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Duck Hunt')
    .setDescription('Duck Hunt server description here')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('duck-hunt-ws', {
      url: 'ws://localhost:3001',
      protocol: 'socket.io',
    })
    .build();

  const asyncapiDocument = AsyncApiModule.createDocument(app, asyncApiOptions);

  await AsyncApiModule.setup('/', app, asyncapiDocument);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap()
  .then(() => {
    console.log('Server is running on port 3001');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
