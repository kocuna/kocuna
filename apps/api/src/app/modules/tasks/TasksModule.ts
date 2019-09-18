import { Module } from '@nestjs/common';
import { TaskEntityConverterService } from './services/TaskEntityConverterService';
import { TaskRepository } from './repositores/TaskRepository';
import { TasksController } from './controllers/TasksController';
import { TasksService } from './services/TasksService';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [
    TasksController
  ],
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository
    ])
  ],
  providers: [
    TaskEntityConverterService,
    TasksService
  ]
})
export class TasksModule {}
