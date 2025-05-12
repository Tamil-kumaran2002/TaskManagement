import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
 
  constructor(private readonly authservice: AuthService ,
    private userService :UserService
   ) {}

  
  @Post('register')
   create(@Body() user: UserDto) {
  
    return this.userService.create(user);
  }


  @Post('login')
 login(@Body() user :UserDto)
 {
   return  this.authservice.validateuser(user)
 }

 
}
