import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
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
  addToDo(@Body() newtodo: AddTodoDto, @Req() req) {
    return this.todoService.addToDo(newtodo, req.userId);
  }

  @Post('add2')
  async addToDoV2(@Body() newtodo: AddTodoDto, @Req() req) {
    const userId = req['userId'];
    console.log(userId);
    return await this.todoService.addTodoV2(newtodo, userId);
  }

  @Get('get/:id')
  findById(@Param('id') id: string): Todo {
    return this.todoService.findById(id);
  }

  @Get('get2/:id')
  async findById2(@Param('id') id: string): Promise<TodoModel> {
    return await this.todoService.findById2(id);
  }

  @Get('stats/:status')
  async getTodoStatsV2(@Param() param): Promise<any> {
    return await this.todoService.getToDoStatsV2(param.status);
  }

  @Get('stats')
  async getTodoStats(): Promise<any> {
    return await this.todoService.getToDoStats();
  }

  @Get('all2')
  async getAll() {
    return await this.todoService.GetAll();
  }

  @Get('all')
  async StatusCriteria(
    @Query() conditions: TodoSearchParamsDTO,
  ): Promise<Todo[]> {
    console.log(conditions);
    return await this.todoService.StatusCriteria(conditions);
  }

  @Get('Paginate')
  async Paginate(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    console.log(page, offset);

    return await this.todoService.paginateTodos(page, offset);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string, @Req() req): Todo[] {
    return this.todoService.delete(id, req.userId);
  }

  @Delete('delete2/:id')
  async deleteV2(@Param('id', ParseIntPipe) id: string, @Req() req) {
    return await this.todoService.deleteV2(id, req.userId);
  }

  @Delete('Sdelete/:id')
  Sdelete(@Param('id') id: string, @Req() req) {
    return this.todoService.Sdelete(id, req.userId);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() newtodo: UpdateTodoDto,
    @Req() req,
  ): Todo {
    return this.todoService.update(id, newtodo, req.userId);
  }

  @Put('update2/:id')
  async updateV2(
    @Param('id') id: string,
    @Body() newtodo: UpdateTodoDto,
    @Req() req,
  ) {
    return await this.todoService.updateV2(id, newtodo, req.userId);
  }

  @Put('restore/:id')
  async restore(@Param('id') id: string, @Req() req) {
    return await this.todoService.restoreSection(id, req.userId);
  }
}
