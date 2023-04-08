import { TodoStatusEnum } from '../entities/todo';

export class TodoSearchParamsDTO {
  status: TodoStatusEnum;
  criteria: string;
}
