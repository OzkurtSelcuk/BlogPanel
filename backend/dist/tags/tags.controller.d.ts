import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(body: any): Promise<import("./entities/tag.entity").Tag>;
    findAll(): Promise<import("./entities/tag.entity").Tag[]>;
}
