import {  Body, Controller, Post, UseGuards ,Req, Put, Delete, Param, Get} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserController } from "src/user/user.controller";
import { UserDto } from "src/user/user.dto";
import { CreateTaskDto } from "./task.dto";
import { TaskService } from "./task.service";
import { get } from "node:http";

@Controller('task')
export class TaskController {
 constructor(private readonly taskService: TaskService) {}
 

 
  @UseGuards(JwtAuthGuard)
  @Post('create')
create(@Req() req,@Body() dto :CreateTaskDto)
  {
   
  return this.taskService.create(req,dto);

  }
  

  @UseGuards(JwtAuthGuard)
  @Put("update")
update(@Req () req ,@Body() dto :CreateTaskDto)
{
  return this.taskService.update(req,dto);
 
}

@UseGuards(JwtAuthGuard)
@Delete("delete")
delete(@Req () req ,@Body() dto :CreateTaskDto)
{
   return this.taskService.deleteTask(req,dto);
}


@UseGuards(JwtAuthGuard)
@Get(':id')
async getTaskById(@Param('id') id: number, @Req() req: any) {
  return this.taskService.getById(req, id);
}



}
