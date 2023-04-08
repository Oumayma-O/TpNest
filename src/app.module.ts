import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo/todo.service';
import { CommonModuleModule } from './common-module/common-module.module';
import * as dotenv from 'dotenv';
import { Todo } from './todo/entities/todo';
dotenv.config();

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}', Todo],
      synchronize: true,
    }),
    CommonModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService, TodoService],
})
export class AppModule {}
