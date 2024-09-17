import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module'
import { PrismaModule } from 'prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

//console.log(__dirname);
//console.log(join(__dirname, '..', '..', '..', 'frontend', 'dist'));


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TasksModule, 
    PrismaModule, UsersModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'frontend', 'dist'),
      renderPath: "/"
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
