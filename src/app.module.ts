/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'nest-mysql',
      synchronize: true,
      entities: [User, Subject],
    }),
    TypeOrmModule.forFeature([User, Subject]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
