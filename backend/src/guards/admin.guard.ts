import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Frontend'den gelen 'user-id' başlığını oku
    const userId = request.headers['user-id'];

    if (!userId) {
      throw new UnauthorizedException('Giriş yapmanız gerekiyor!');
    }

    // 2. Bu ID'ye sahip kullanıcıyı veritabanından bul
    const user = await this.usersService.findOne(+userId);

    // 3. Kullanıcı var mı ve Rolü 'admin' mi?
    if (user && user.role === 'admin') {
      return true; // Kapıyı aç, geçsin
    }

    throw new UnauthorizedException('Bu işlem için Admin yetkisi gerekiyor!');
  }
}