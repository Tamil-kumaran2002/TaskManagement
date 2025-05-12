import { Role } from 'src/common/enums/role.enum';
import { TaskAssignment } from 'src/task/task.assignment.entity';
import { Task } from 'src/task/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password:string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  @OneToMany(() => TaskAssignment, assignment => assignment.user)
  taskAssignments: TaskAssignment[];

  @OneToMany(() => Task, task => task.createdBy)
  createdTasks: Task[];

}
