import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo';
import { TodoModel } from './entities/todoModel';

@Module({
  imports: [TypeOrmModule.forFeature([TodoModel])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
