import { TaskStatus } from "src/common/enums/status.enum";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskAssignment } from "./task.assignment.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

   @ManyToOne(() => User , {eager:true})
  createdBy: User;

  @OneToMany(() => TaskAssignment, assignment => assignment.task,{eager:true})
  assignments: TaskAssignment[];


  @CreateDateColumn()
  createdAt: Date;
    


}
