import { IsNotEmpty, IsNumber, Length, MinLength } from 'class-validator';
import { validationMessages } from '../validation-messages';

export class AddTodoDto {
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
  name: string;

  @IsNotEmpty({ message: validationMessages.description.required })
  @MinLength(10, { message: validationMessages.description.minlength })
  description: string;
}
