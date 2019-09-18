import { EntityRepository, Repository } from 'typeorm';

import { TaskEntity } from '../entities/TaskEntity';
import { CreateTaskDto } from '../dtos/CreateTaskDto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  public async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const taskEntity: TaskEntity = new TaskEntity();

    taskEntity.title = createTaskDto.title;
    taskEntity.description = createTaskDto.description;
    taskEntity.status = TaskStatusEnum.Open;

    await taskEntity.save();

    return taskEntity;
  }
}
