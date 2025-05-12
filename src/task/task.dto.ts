import { IsString, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';
import { TaskStatus } from 'src/common/enums/status.enum';

export class CreateTaskDto {
  
  id:number;  

    @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  assignedUserIds: number[];  
}
