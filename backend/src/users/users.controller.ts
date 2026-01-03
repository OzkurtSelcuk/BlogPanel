import { Controller, Get, Post, Body, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const user = await this.usersService.findOneByUsername(loginData.username);
    if (!user || user.password !== loginData.password) {
      throw new BadRequestException('Kullanıcı adı veya şifre hatalı!');
    }
    const { password, ...result } = user;
    return { message: 'Giriş başarılı', user: result };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}