import { AppController } from './AppController';
import { AppService } from './AppService';
import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/TasksModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeOrmConfig';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule
  ],
  providers: []
})
export class AppModule {}
