import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from '../dtos/GetTasksFilterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../../../entities/TaskEntity';
import { TaskRepository } from '../repositores/TaskRepository';
import { TaskStatusEnum } from '@responses/tasks/TaskResponse';
import { UserEntity } from '../../../entities/UserEntity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly _taskRepository: TaskRepository
  ) {
  }

  public async getAllTasks(
    filterDto: GetTasksFilterDto,
    sessionUser: UserEntity
  ): Promise<TaskEntity[]> {
    return this._taskRepository.getAllTasks(filterDto, sessionUser);
  }

  public async getTaskById(
    id: number,
    sessionUser: UserEntity
  ): Promise<TaskEntity> {
    const foundTaskEntity: Undefinable<TaskEntity> = await this._taskRepository.findOne({
      where: {
        id,
        userId: sessionUser.id
      }
    });

    if(!foundTaskEntity) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return foundTaskEntity;
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    sessionUser: UserEntity
  ): Promise<TaskEntity> {
    return this._taskRepository.createTask(createTaskDto, sessionUser);
  }

  public async updateTaskStatus(
    id: number,
    status: TaskStatusEnum,
    sessionUser: UserEntity
  ): Promise<TaskEntity> {
    const taskEntity: TaskEntity = await this.getTaskById(id, sessionUser);

    taskEntity.status = status;
    await taskEntity.save();

    return taskEntity;
  }

  public async deleteTaskById(
    id: number,
    sessionUser: UserEntity
  ): Promise<void> {
    const result: DeleteResult = await this._taskRepository.delete({
      id,
      userId: sessionUser.id
    });
    const noTasksDeleted: number = 0;

    // This means the task did not exist or some unexpected error
    if(result.affected === noTasksDeleted) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
