import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';



@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'TaskManager',
      entities: [User,Task],
      synchronize: true,
        autoLoadEntities: true,
    }),
  
  UserModule, AuthModule,TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
