import { TodoStatusEnum } from '../entities/todo';
import { IsEnum, IsOptional } from 'class-validator';
import { validationMessages } from '../validation-messages';

export class TodoSearchParamsDTO {
  @IsOptional()
  @IsEnum(TodoStatusEnum, { message: validationMessages.status.isIn })
  status: TodoStatusEnum;
  @IsOptional()
  criteria: string;
}
