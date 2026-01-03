import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { title, content, userId, categoryId, tagIds } = createPostDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı!');
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) throw new NotFoundException('Kategori bulunamadı!');
    let tags: Tag[] = [];
    if (tagIds && tagIds.length > 0) {
      tags = await this.tagRepository.findBy({ id: In(tagIds) });
    }
    const newPost = this.postRepository.create({ title, content, user, category, tags });
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find({
      relations: ['user', 'category', 'tags'],
      order: { id: 'DESC' }
    });
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'tags'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException('Yazı bulunamadı');
    const { title, content, categoryId, tagIds } = updatePostDto;
    if (title) post.title = title;
    if (content) post.content = content;
    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (category) post.category = category;
    }
    if (tagIds) {
      const tags = await this.tagRepository.findBy({ id: In(tagIds) });
      post.tags = tags;
    }
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    return this.postRepository.delete(id);
  }
}