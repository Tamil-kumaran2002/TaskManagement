import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/user/user.entity';
import { TaskStatus } from 'src/common/enums/status.enum';

@Entity()
export class TaskAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.taskAssignments, { eager: true })
  user: User;

  @ManyToOne(() => Task, task => task.assignments)
  task: Task;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;
}
