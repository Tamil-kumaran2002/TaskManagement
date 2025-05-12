import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "./task.controller";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { Module } from "@nestjs/common";
import { TaskAssignment } from "./task.assignment.entity";
import { User } from "src/user/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Task,TaskAssignment,User])],
  controllers: [TaskController],
  providers: [TaskService],
  
})
export class TaskModule {}