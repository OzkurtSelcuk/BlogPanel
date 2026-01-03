import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './post/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { User } from './users/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Category } from './categories/entities/category.entity';
import { Tag } from './tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // İşte senin temizlenmiş, doğru linkin:
      url: 'postgresql://neondb_owner:npg_4WgdDEF8fIHt@ep-young-leaf-agqc3455-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require',
      entities: [User, Post, Category, Tag],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Bağlantı hatasını engelleyen ayar
      },
    }),
    UsersModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}