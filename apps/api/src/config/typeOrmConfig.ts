import { TaskEntity } from '../app/modules/tasks/entities/TaskEntity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  database: 'postgres',
  entities: [
    TaskEntity
  ],
  host: '127.0.0.1',
  port: 5432,
  synchronize: false,
  type: 'postgres',
  username: 'postgres'
};
