import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { PostTaskRequest } from '@requests/tasks/PostTaskRequest';
import { TaskStatusEnum } from '@responses/tasks/TaskResponse';

export class GetTasksFilterDto implements PostTaskRequest {
  @IsNotEmpty()
  @IsIn(Object.values(TaskStatusEnum))
  @IsString()
  public status?: TaskStatusEnum;

  @IsString()
  public search?: string;
}
