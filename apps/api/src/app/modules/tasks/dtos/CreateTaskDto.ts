import { IsNotEmpty, IsString } from 'class-validator';
import { PostTaskRequest } from '@requests/tasks/PostTaskRequest';

export class CreateTaskDto implements PostTaskRequest {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;
}
