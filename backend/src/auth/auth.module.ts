import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { LocalSrategy } from './strategies/local.strategy'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'
import { GoogleStrategy } from './strategies/google.stratery'
import { JwtAccessSrtategy } from './strategies/jwt-access.strategy'

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalSrategy, JwtRefreshStrategy, GoogleStrategy, JwtAccessSrtategy],
})
export class AuthModule { }
