import { TaskResponse, TaskStatusEnum } from '@responses/tasks/TaskResponse';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../repositores/TaskRepository';
import { TaskEntity } from '../entities/TaskEntity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly _taskRepository: TaskRepository
  ) {
  }

  // public getAllTasks(): TaskResponse[] {
  //   return this._tasks;
  // }

  public async getTaskById(id: number): Promise<TaskEntity> {
    const found: Undefinable<TaskEntity> = await this._taskRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const taskEntity: TaskEntity = new TaskEntity();

    taskEntity.title = createTaskDto.title;
    taskEntity.description = createTaskDto.description;
    taskEntity.status = TaskStatusEnum.Open;

    await taskEntity.save();

    return taskEntity;
  }

  // public deleteTaskById(id: string): Undefinable<TaskResponse> {
  //   let task: Undefinable<TaskResponse>;
  //   const itemNotFound: number = -1;

  //   const taskIndex: number = this._tasks.findIndex((currentTask: TaskResponse) => currentTask.id === id);

  //   if(taskIndex !== itemNotFound) {
  //     task = this._tasks[taskIndex];
  //     const deleteCount: number = 1;

  //     this._tasks.splice(taskIndex, deleteCount);
  //   }

  //   return task;
  // }

  // private *_getIdGenerator(): IterableIterator<string> {
  //   let id: number = 1;

  //   while(true) {
  //     yield id.toString();
  //     id++;
  //   }
  // }
}
