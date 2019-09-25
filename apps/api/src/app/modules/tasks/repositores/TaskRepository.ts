import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { GetTasksFilterDto } from '../dtos/GetTasksFilterDto';
import { TaskEntity } from '../../../entities/TaskEntity';
import { TaskStatusEnum } from '@responses/tasks/TaskResponse';
import { UserEntity } from '../../../entities/UserEntity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  // eslint-disable-next-line max-lines-per-function
  public async getAllTasks(
    filterDto: GetTasksFilterDto,
    sessionUser: UserEntity
  ): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query: SelectQueryBuilder<TaskEntity> = this.createQueryBuilder('task');

    query.where('task.user_id = :userId', {
      userId: sessionUser.id
    });

    if(status) {
      query.andWhere('task.status = :status', {
        status
      });
    }

    if(search) {
      query.andWhere('(task.title like :search OR task.description LIKE :search)', {
        search: `%${search}`
      });
    }

    return query.getMany();
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    sessionUser: UserEntity
  ): Promise<TaskEntity> {
    const taskEntity: TaskEntity = new TaskEntity();

    taskEntity.title = createTaskDto.title;
    taskEntity.description = createTaskDto.description;
    taskEntity.status = TaskStatusEnum.Open;
    taskEntity.user = sessionUser;

    await taskEntity.save();

    return taskEntity;
  }
}
