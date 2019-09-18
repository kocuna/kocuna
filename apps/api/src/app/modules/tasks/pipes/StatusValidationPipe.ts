import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatusEnum } from '@responses/tasks/TaskResponse';

export class StatusValidationPipe implements PipeTransform {
  // In this case, any does make sense as we don't know what type of value is coming
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform(value: any, metadata: ArgumentMetadata): string {
    const allStatuses: string[] = Object.values(TaskStatusEnum);
    const isValueValid: boolean = allStatuses.includes(value);

    if(!isValueValid) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }
}
