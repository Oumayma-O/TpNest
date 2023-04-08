import { TodoStatusEnum } from '../entities/todo';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';
import { validationMessages } from '../validation-messages';

export class UpdateTodoDto {
  @IsOptional()
  @Length(3, 10, {
    message: (validationErrors) => {
      if (validationErrors[0] === 'minLength') {
        return validationMessages.name.minlength;
      }
      if (validationErrors[0] === 'maxLength') {
        return validationMessages.name.maxlength;
      }
    },
  })
  name?: string;

  @IsOptional()
  @MinLength(10, { message: validationMessages.description.minlength })
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum, { message: validationMessages.status.isIn })
  status?: TodoStatusEnum;
}
