import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatusEnum {
  'actif' = 'en cours',
  'waiting' = 'en attente',
  'done' = 'finalisé',
}

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  constructor(
    id: number,
    name: string,
    description: string,
    status: TodoStatusEnum = TodoStatusEnum.waiting,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }
}
