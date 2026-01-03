import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    user: User;
    category: Category;
    tags: Tag[];
}
