import { TaskEntity } from '../app/entities/TaskEntity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../app/entities/UserEntity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  database: 'postgres',
  entities: [
    TaskEntity,
    UserEntity
  ],
  host: '127.0.0.1',
  logging: [
    'query'
  ],
  port: 5432,
  synchronize: false,
  type: 'postgres',
  username: 'postgres'
};
