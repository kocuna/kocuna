import { TaskResponse, TaskStatusEnum } from '@responses/tasks/TaskResponse';
import { EntityConverter } from '../../../converters/EntityConverter';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../../../entities/TaskEntity';

@Injectable()
export class TaskEntityConverterService implements EntityConverter<TaskEntity, TaskResponse> {
  public toResponse(taskEntity: TaskEntity): TaskResponse {
    const response: TaskResponse = {
      description: taskEntity.description,
      id: taskEntity.id,
      status: taskEntity.status as TaskStatusEnum,
      title: taskEntity.title
    };

    return response;
  }
}
