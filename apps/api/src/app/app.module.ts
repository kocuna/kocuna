import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  controllers: [AppController],
  imports: [TasksModule],
  providers: [AppService]
})
export class AppModule {}
