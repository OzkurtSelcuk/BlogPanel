import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';
export declare class PostsService {
    private postRepository;
    private userRepository;
    private categoryRepository;
    private tagRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, categoryRepository: Repository<Category>, tagRepository: Repository<Tag>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
