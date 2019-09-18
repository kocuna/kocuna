import { ApiResponse } from '../ApiResponse';

export enum TaskStatusEnum {
  Open = 'open',
  InProgress = 'inProgress',
  Done = 'done'
}

export interface TaskResponse extends ApiResponse {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
}
