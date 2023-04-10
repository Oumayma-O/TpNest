import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TodoStatusEnum } from './todo';
import { TimeEntity } from './TimeEntity';

@Entity()
export class TodoModel extends TimeEntity {
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

  @Column({ update: false })
  userId: string;
}
