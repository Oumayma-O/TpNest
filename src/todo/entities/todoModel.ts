import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from './todo';

@Entity()
export class TodoModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  name: string;

  @Column()
  description: string;

  @Column({
    enum: TodoStatusEnum,
    type: 'enum',
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
}
