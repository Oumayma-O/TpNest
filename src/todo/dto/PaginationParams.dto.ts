import { IsNumber } from 'class-validator';

export class PaginationParamsDto {
  @IsNumber()
  pageNumber = 1;

  @IsNumber()
  pageSize = 10;
}
