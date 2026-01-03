import { Post } from '../../post/entities/post.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    role: string;
    posts: Post[];
}
