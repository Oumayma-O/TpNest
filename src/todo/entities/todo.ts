export enum TodoStatusEnum {
  'actif' = 'en cours',
  'waiting' = 'en attente',
  'done' = 'finalisé',
}

export class Todo {
  id: string;

  name: string;

  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
  userId: string;

  constructor(
    userId: string,
    id: string,
    name: string,
    description: string,
    status: TodoStatusEnum = TodoStatusEnum.waiting,
  ) {
    this.userId = userId;
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = new Date();
  }
}
