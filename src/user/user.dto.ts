import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
  @IsString({ message: 'Name must be a string' })
  name: string;
   @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}