// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto & { adminKey?: string }) {
    const existingUser = await this.findOneByUsername(createUserDto.username);
    if (existingUser) {
      throw new Error('Bu kullanıcı adı zaten alınmış!');
    }

    // --- ADMİN OLMA MANTIĞI ---
    // Eğer gelen veride 'adminKey' varsa ve şifre '12345' ise admin yap.
    let role = 'user';
    if (createUserDto.adminKey === '12345') {
      role = 'admin';
    }

    const newUser = this.usersRepository.create({
      username: createUserDto.username,
      password: createUserDto.password,
      role: role // Belirlenen rolü ata
    });
    
    return this.usersRepository.save(newUser);
  }
  
  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}