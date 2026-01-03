import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';

// DİĞER MODÜL VE ENTITYLER
import { UsersModule } from '../users/users.module'; // <--- BU SATIR EKLENDİ
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [
    // 1. Veritabanı Tabloları
    TypeOrmModule.forFeature([Post, User, Category, Tag]),
    
    // 2. BAĞIMLILIKLAR (UsersService'i kullanabilmek için bunu ekledik)
    UsersModule 
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}