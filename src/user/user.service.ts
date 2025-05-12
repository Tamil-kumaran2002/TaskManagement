import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {

    const email= await this.usersRepository.findOne({ where:{ email: userDto.email}})
    if(email)
    {
       throw new ConflictException('Email already exists');
    }
    const user = new User();
    user.email = userDto.email;
    user.name = userDto.name;
   const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(userDto.password, salt);
    return this.usersRepository.save(user);
  }
}
