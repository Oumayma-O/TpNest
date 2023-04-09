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
import { TodoModel } from './entities/todoModel';

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
  @Post('add2')
  async addToDoV2(@Body() newtodo: AddTodoDto) {
    return await this.todoService.addTodoV2(newtodo);
  }

  @Get('get/:id')
  findById(@Param('id') id: string): Todo {
    return this.todoService.findById(id);
  }
  @Get('stats/:status')
  async getTodoStats(@Param() param): Promise<any> {
    return await this.todoService.getToDoStatsV2(param.status);
  }
  /*
  @Get('all')
  async getAllToDos (
    @Query('conditions') conditions: TodoSearchParamsDTO,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) : Promise<TodoModel[]>{
    return await this.todoService.getAllToDos(conditions, page, pageSize);
  }
*/
  @Delete('delete/:id')
  delete(@Param('id') id: string): Todo[] {
    return this.todoService.delete(id);
  }

  @Delete('delete2/:id')
  async deleteV2(@Param('id', ParseIntPipe) id: string) {
    return await this.todoService.deleteV2(id);
  }

  @Delete('Sdelete/:id')
  Sdelete(@Param('id') id: string) {
    return this.todoService.Sdelete(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() newtodo: UpdateTodoDto): Todo {
    return this.todoService.update(id, newtodo);
  }

  @Put('update2/:id')
  async updateV2(@Param('id') id: string, @Body() newtodo: UpdateTodoDto) {
    return await this.todoService.updateV2(id, newtodo);
  }

  @Put('restore/:id')
  async restore(@Param('id') id: string) {
    return await this.todoService.restoreSection(id);
  }
}
