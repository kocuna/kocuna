import { EntityConverter } from '../../../converters/EntityConverter';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/TaskEntity';
import { TaskResponse } from '@responses/tasks/TaskResponse';

@Injectable()
export class TaskEntityConverterService implements EntityConverter<TaskEntity, TaskResponse> {
  public toResponse(entity: TaskEntity): TaskResponse {
    const response: TaskResponse = {
      ...entity
    };

    return response;
  }
}
