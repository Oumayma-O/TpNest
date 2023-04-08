import { TodoStatusEnum } from '../entities/todo';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { validationMessages } from '../validation-messages';

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty({ message: validationMessages.name.required })
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
  @IsNotEmpty({ message: validationMessages.description.required })
  @Length(10, undefined, { message: validationMessages.description.minlength })
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum, { message: validationMessages.status.isIn })
  status?: TodoStatusEnum;
}
