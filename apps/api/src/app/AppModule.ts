import { AuthModule } from './modules/auth/AuthModule';
import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/TasksModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeOrmConfig';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule
  ],
  providers: []
})
export class AppModule {}
