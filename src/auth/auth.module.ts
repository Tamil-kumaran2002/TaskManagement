import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import passport from "passport";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey', 
      signOptions: { expiresIn: '1d' }, 
      
    
    }),
   UserModule,
   PassportModule
  ],
  providers: [AuthService,JwtStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}