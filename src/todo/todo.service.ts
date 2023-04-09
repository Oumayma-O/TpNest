import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Todo, TodoStatusEnum } from 'src/todo/entities/todo';
import { AddTodoDto } from 'src/todo/dto/addTodo.dto';
import { UpdateTodoDto } from 'src/todo/dto/updateTodo.dto';
import { TOKENS } from '../common-module/common-module.module';

import { Like, Repository } from 'typeorm';
import { TodoSearchParamsDTO } from './dto/SearchParamsTodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoModel } from './entities/todoModel';

@Injectable()
export class TodoService {
  @Inject('UUID') private readonly uuid: () => string;

  todos: Todo[] = [];

  constructor(
    @InjectRepository(TodoModel)
    private ToDoRepository: Repository<TodoModel>,
  ) {}

  findAll(): Todo[] {
    console.log(`find all `);
    return this.todos;
  }
  async GetAll(): Promise<TodoModel[]> {
    console.log(`get all `);
    return this.ToDoRepository.find();
  }

  async StatusCriteria(conditions: TodoSearchParamsDTO): Promise<Todo[]> {
    const { status, criteria } = conditions;
    if (!status && !criteria) {
      return await this.ToDoRepository.find();
    } else if (status || criteria) {
      const nameQuery = Like(`%${criteria}%`);
      const descriptionQuery = Like(`%${criteria}%`);
      const statusQuery = status;
      return await this.ToDoRepository.find({
        where: [
          { name: nameQuery, status: statusQuery },
          { description: descriptionQuery, status: statusQuery },
        ],
      });
    }
    /* const { status, criteria } = conditions;
    const qb = this.ToDoRepository.createQueryBuilder('todo');
    if (status) {
      await qb
        .where({
          status: In([
            TodoStatusEnum.actif,
            TodoStatusEnum.done,
            TodoStatusEnum.waiting,
          ]),
        })
        .getRawMany();
    }
    if (criteria) {
      return await qb
        .where('todo.name= :criteria OR todo.description= :criteria')
        .setParameters({ criteria })
        .getRawMany();
    }
    return await this.GetAll();*/
  }

  async paginateTodos(page: number, offset: number) {
    return await this.ToDoRepository.find({
      skip: offset * page,
      take: offset,
    });
  }

  /* async getAllToDos(
    conditions: TodoSearchParamsDTO,
    page: number,
    take: number,
  ): Promise<TodoModel[]> {
    const { status, criteria } = conditions;
    const query = this.ToDoRepository.createQueryBuilder('todo');

    if (!status && !criteria) {
      return await this.ToDoRepository.find();
    } else if (status || criteria) {
      if (status && criteria) {
        query
          .where('todo.status=:status', { status })
          .andWhere(
            'todo.name LIKE:criteria OR todo.description LIKE: criteria',
            {
              criteria: '%${criteria}%',
            },
          );
      } else if (status) {
        query.where('todo.status =: status', { status });
      } else if (criteria) {
        query.where(
          'todo.name LIKE:criteria OR todo.description LIKE: criteria',
          {
            criteria: '%${criteria}%',
          },
        );
      }
    }
    const skip = (page - 1) * take;

    query.skip(skip).take(take);

    // Execute the query and return the results
    const [todos, count] = await query.getManyAndCount();
    const pageCount = Math.ceil(count / take);
    return {
      items: todos,
      total: count,
      page: page,
      pageCount: pageCount,
    };
  }*/

  addToDo(newtodo: AddTodoDto): Todo {
    const todo = new Todo(this.uuid(), newtodo.name, newtodo.description);
    console.log(`add item `);
    this.todos.push(todo);
    return todo;
  }

  async addTodoV2(newtodo: AddTodoDto) {
    return await this.ToDoRepository.save(newtodo);
  }

  findById(id: string): Todo {
    console.log(`get item `);
    const todo = this.todos.find((todo) => todo.id == id);
    if (!todo) return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }
  async findById2(id: string): Promise<TodoModel> {
    const todo = await this.ToDoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  delete(id: string): Todo[] {
    const index = this.todos.findIndex((todo) => todo.id == id);
    console.log(`delete item `);
    if (index >= 0) {
      return this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
  }

  async deleteV2(id: string) {
    /*
    const ToDoRemove = this.todos.find((todo) => todo.id == id);
    if (ToDoRemove == null) throw new BadRequestException();
    return await this.ToDoRepository.remove(ToDoRemove);*/

    return await this.ToDoRepository.delete(id);
  }

  async Sdelete(id: string) {
    return await this.ToDoRepository.softDelete(id);
  }

  update(id: string, newtodo: UpdateTodoDto): Todo {
    const t: Todo = this.findById(id);
    t.name = newtodo.name;
    t.description = newtodo.description;
    t.status = newtodo.status;
    console.log(`update item `);
    return t;
  }

  async updateV2(id: string, newToDo: UpdateTodoDto) {
    /*const newTD = await this.ToDoRepository.preload({
      id,
      ...newToDo,
    });
    return await this.ToDoRepository.save(newTD);*/

    return await this.ToDoRepository.update(id, { ...newToDo });
  }

  async restoreSection(id: string) {
    return await this.ToDoRepository.restore(id);
  }
  async getToDoStats(): Promise<any> {
    const todos = await this.ToDoRepository.find();
    return {
      actif: todos.filter((todo) => todo.status === TodoStatusEnum.actif)
        .length,
      waiting: todos.filter((todo) => todo.status === TodoStatusEnum.waiting)
        .length,
      done: todos.filter((todo) => todo.status === TodoStatusEnum.done).length,
    };
  }

  async getToDoStatsV2(status: any) {
    return await this.ToDoRepository.count({ where: { status: status } });
  }
}
