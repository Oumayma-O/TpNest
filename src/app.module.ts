import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModuleModule } from './common-module/common-module.module';
import * as dotenv from 'dotenv';
import { TodoModel } from './todo/entities/todoModel';
dotenv.config();

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: process.env.DB_PASSWORD,
      database: 'nesttodo',
      entities: ['dist/**/*.entity{.ts,.js}', TodoModel],
      synchronize: true,
    }),
    CommonModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
