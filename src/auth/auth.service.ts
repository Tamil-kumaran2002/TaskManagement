import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/user/user.dto";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

import { Injectable } from "@nestjs/common";
@Injectable()
export class AuthService{


constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtservice :JwtService
  ) {}

async validateuser(userdto :UserDto )
 {
  const user = await this.usersRepository.findOne({
    where: { email: userdto.email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(userdto.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const payload = { email: user.email, sub: user.id };
    const jwt = await this.jwtservice.signAsync(payload);
    return jwt;

}





}
