import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';

import { UsersModule } from '../users/users.module'; 
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Category, Tag]),
 
    UsersModule 
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}