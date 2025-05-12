import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { In, Repository } from "typeorm";
import { CreateTaskDto } from "./task.dto";
import { TaskAssignment } from "./task.assignment.entity";
import { User } from "src/user/user.entity";
import { TaskStatus } from "src/common/enums/status.enum";
import { async } from "rxjs";
import { title } from "node:process";


@Injectable()
export class TaskService {

  
  
  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
    @InjectRepository(TaskAssignment)
    private AssignmentRepository:Repository<TaskAssignment>,

    @InjectRepository(User)
    private  userRepository:Repository<User>
  ) {}

async create(req: any, dto: CreateTaskDto)
{
       
  
 const user = await this.userRepository.findOneBy({ id: req.user.userId });

    if (!user) {
      throw new Error('User not found');
    }

    const task = this.TaskRepository.create({
      title: dto.title,
      description: dto.description,
      createdBy: user,
      status: TaskStatus.TODO,
      createdAt: new Date(),
    });

     await this.TaskRepository.save(task);


const assignedUserIds =this.userRepository.find({
  where: { id: In(dto.assignedUserIds) }
})


 const assignments = (await assignedUserIds).map((assignedUser) =>
    this.AssignmentRepository.create({
      user: assignedUser,
      task:task,
      status:TaskStatus.TODO
      
    }),
  );

 return await this.AssignmentRepository.save(assignments);




  }
 async update(req: any, dto: CreateTaskDto) {

  // async update(req: any, taskId: number, dto: UpdateTaskDto) {
  const user = await this.userRepository.findOneBy({ id: req.user.userId });

  const task = await this.TaskRepository.findOne({
    where: { id: dto.id },
   
  });

  if (!task) {
    throw new Error('Task not found');
  }

  if (task.createdBy.id !== user?.id) {
    throw new Error('Unauthorized: Only the creator can update this task');
  }

  // Update basic fields
  task.title = dto.title ?? task.title;
  task.description = dto.description ?? task.description;
  task.status = dto.status ?? task.status;

  await this.TaskRepository.save(task);

  // Optional: update assignments
  if (dto.assignedUserIds) {
    // Delete previous assignments
   // await this.AssignmentRepository.delete({ task: { id: task.id } });

    // Add new assignments
    const users = await this.userRepository.find({
      where: { id: In(dto.assignedUserIds) },
    });

    const assignments = users.map((user) =>
      this.AssignmentRepository.create({
        user,
        task,
       status:TaskStatus.TODO
      }),
    );

    await this.AssignmentRepository.save(assignments);
  }

  return task;
}

 async deleteTask(req: any, dto: CreateTaskDto) {
  
  const user = await this.userRepository.findOneBy({ id: req.user.userId });

  const task = await this.TaskRepository.findOne({
    where: { id: dto.id },
   
  });

  if (!task) {
    throw new Error('Task not found');
  }

  if (task.createdBy.id !== user?.id) {
    throw new Error('Unauthorized: Only the creator can delete this task');
  }

  // Delete assignments first (to avoid FK constraints)
  await this.AssignmentRepository.delete({ task: { id: task.id } });

  // Then delete the task
  await this.TaskRepository.delete({ id: task.id });

  return { message: 'Task deleted successfully' };
}




  async getById(req: any, id: number) {
 // const user = await this.userRepository.findOneBy({ id: req.user.userId });

  const task = await this.TaskRepository.findOne({
    where: { id },
 
  });

  if (!task) {
    throw new Error('Task not found');
  }

 
  

  return {
    title: task.title,
    description: task.description,
    createdAt: task.createdAt,
    createdBy: {
     
      name: task.createdBy.name,
    },
    assignments: task.assignments.map(assignment => ({
      userId: assignment.user.id,
      Name: assignment.user.name
      
     
    })),
  };
}
  
  }
   





