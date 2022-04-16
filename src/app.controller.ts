/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.appService.getAll();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: number): Promise<any> {
    return this.appService.getSingle(id);
  }

  @Post('users')
  async createUser(@Body('name') name: string): Promise<User> {
    return this.appService.create(name);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: number, @Body('name') name: string): Promise<any> {
    return this.appService.update(id, name);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    return this.appService.deleteUser(id);
  }
}
