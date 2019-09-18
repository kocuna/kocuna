import {
    Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param,
    ParseIntPipe, Post, UsePipes, ValidationPipe
} from '@nestjs/common';
import { TaskResponse } from '@responses/tasks/TaskResponse';

import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { TaskEntity } from '../entities/TaskEntity';
import { TasksService } from '../services/TasksService';
import { TaskEntityConverterService } from '../services/TaskEntityConverterService';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
    private readonly _taskEntityConverterService: TaskEntityConverterService
  ) {
  }

  // @Get()
  // public getAllTasks(): TaskResponse[] {
  //   return this._tasksService.getAllTasks();
  // }

  @Get('/:id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TaskResponse> {
    const task: TaskEntity = await this._tasksService.getTaskById(id);

    return this._taskEntityConverterService.toResponse(task);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<TaskResponse> {
    const taskEntity: TaskEntity = await this._tasksService.createTask(createTaskDto);

    return taskEntity.toResponse();
  }

  // @Delete('/:id')
  // public deleteTaskById(
  //   @Param('id') id: string
  // ): TaskResponse {
  //   const task: Undefinable<TaskResponse> = this._tasksService.deleteTaskById(id);

  //   if(task === undefined) {
  //     throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
  //   }

  //   return task;
  // }
}
