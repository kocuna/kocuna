import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskResponse, TaskStatusEnum } from '@responses/tasks/TaskResponse';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { GetSessionUser } from '../../../decorators/GetSessionUserDecorator';
import { GetTasksFilterDto } from '../dtos/GetTasksFilterDto';
import { StatusValidationPipe } from '../pipes/StatusValidationPipe';
import { TaskEntity } from '../../../entities/TaskEntity';
import { TaskEntityConverterService } from '../services/TaskEntityConverterService';
import { TasksService } from '../services/TasksService';
import { UserEntity } from '../../../entities/UserEntity';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly _tasksService: TasksService,
    private readonly _taskEntityConverterService: TaskEntityConverterService
  ) {
  }

  @Get()
  public async getAllTasks(
    @Query(
      new ValidationPipe({
        skipMissingProperties: true
      })
    ) filterDto: GetTasksFilterDto,
    @GetSessionUser() sessionUser: UserEntity
  ): Promise<TaskResponse[]> {
    const taskEntities: TaskEntity[] = await this._tasksService.getAllTasks(filterDto, sessionUser);

    return taskEntities
      .map((taskEntity: TaskEntity) => this._taskEntityConverterService.toResponse(taskEntity));
  }

  @Get('/:id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetSessionUser() sessionUser: UserEntity
  ): Promise<TaskResponse> {
    const taskEntity: TaskEntity = await this._tasksService.getTaskById(id, sessionUser);

    return this._taskEntityConverterService.toResponse(taskEntity);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetSessionUser() sessionUser: UserEntity
  ): Promise<TaskResponse> {
    const taskEntity: TaskEntity = await this._tasksService.createTask(createTaskDto, sessionUser);

    return this._taskEntityConverterService.toResponse(taskEntity);
  }

  @Put('/:id/status')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StatusValidationPipe) newStatus: TaskStatusEnum,
    @GetSessionUser() sessionUser: UserEntity
  ): Promise<TaskEntity> {
    return this._tasksService.updateTaskStatus(id, newStatus, sessionUser);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetSessionUser() sessionUser: UserEntity
  ): Promise<void> {
    return this._tasksService.deleteTaskById(id, sessionUser);
  }
}
