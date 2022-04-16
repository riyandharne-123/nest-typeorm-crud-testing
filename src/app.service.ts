/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['subjects'],
    });
  }

  async getSingle(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch(err) {
      throw err;
    }
  }

  async create(name: string): Promise<User> {
    const newUser = this.userRepository.create({ name });
    return await this.userRepository.save(newUser);
  }

  async update(id: number, name: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      user.name = name;
      return await this.userRepository.save(user);
    } catch(err) {
      throw err;
    }
  }
  
  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return await this.userRepository.remove(user);
    } catch(err) {
      throw err;
    }
  }

}
