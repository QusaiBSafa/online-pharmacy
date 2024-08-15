// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserOutgoingDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserOutgoingDto> {
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = this.usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    user = await this.usersRepository.save(user);
    return UserOutgoingDto.buildDto(user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
