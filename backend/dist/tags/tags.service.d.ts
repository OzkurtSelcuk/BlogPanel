import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
export declare class TagsService {
    private tagRepository;
    constructor(tagRepository: Repository<Tag>);
    create(name: string): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findByIds(ids: number[]): Promise<Tag[]>;
}
