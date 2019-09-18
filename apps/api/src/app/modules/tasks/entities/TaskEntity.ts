import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from '@responses/tasks/TaskResponse';

@Entity({
  name: 'task'
})
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({
    default: TaskStatusEnum.Open,
    enum: TaskStatusEnum,
    type: 'enum'
  })
  public status: TaskStatusEnum;
}
