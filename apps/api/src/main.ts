/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';


async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  // eslint-disable-next-line no-process-env
  const port: string = process.env.port || '3333';

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`);
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
