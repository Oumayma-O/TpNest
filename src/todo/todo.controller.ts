import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  Version,
} from '@nestjs/common';
import { Todo } from './entities/todo';
import { async, findIndex } from 'rxjs';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoService } from 'src/todo/todo.service';
import { TodoSearchParamsDTO } from './dto/SearchParamsTodo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    console.log(`get all `);
    return this.todoService.findAll();
  }

  @Post('add')
  addToDo(@Body() newtodo: AddTodoDto) {
    return this.todoService.addToDo(newtodo);
  }
  @Post('add')
  @Version('2')
  async addToDoV2(@Body() newtodo: AddTodoDto): Promise<Todo> {
    return await this.todoService.addTodoV2(newtodo);
  }

  @Get('get/:id')
  findById(@Param('id') id: string): Todo {
    return this.todoService.findById(id);
  }
  @Get('stats/:status')
  @Version('2')
  async getTodoStats(@Param() param): Promise<any> {
    return await this.todoService.getToDoStatsV2(param.status);
  }

  @Get('all')
  @Version(' 2')
  async getAllToDos(
    @Query('conditions') conditions: TodoSearchParamsDTO,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return await this.todoService.getAllToDos(conditions, page, pageSize);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Todo[] {
    return this.todoService.delete(id);
  }

  @Delete('delete/:id')
  @Version('2')
  async deleteV2(@Param('id', ParseIntPipe) id: string) {
    return await this.todoService.deleteV2(id);
  }

  @Delete('Sdelete/:id')
  @Version('Z')
  Sdelete(@Param('id') id: string) {
    return this.todoService.Sdelete(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() newtodo: UpdateTodoDto): Todo {
    return this.todoService.update(id, newtodo);
  }

  @Put('update/:id')
  @Version('2')
  async updateV2(@Param('id') id: string, @Body() newtodo: UpdateTodoDto) {
    return await this.todoService.updateV2(id, newtodo);
  }

  @Put('restore/:id')
  @Version('2')
  async restore(@Param('id') id: string) {
    return await this.todoService.restoreSection(id);
  }
}
