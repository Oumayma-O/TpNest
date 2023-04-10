import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModuleModule } from './common-module/common-module.module';
import * as dotenv from 'dotenv';
import { TodoModel } from './todo/entities/todoModel';
import { AuthMiddleware } from './middlewares/auth-middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

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
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}', TodoModel],
      synchronize: true,
    }),
    CommonModuleModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todo*', method: RequestMethod.PUT },
        { path: 'todo*', method: RequestMethod.POST },
        { path: 'todo*', method: RequestMethod.DELETE },
      );
  }
}
