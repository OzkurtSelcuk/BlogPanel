import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(body: any): Promise<import("./entities/category.entity").Category>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): Promise<import("./entities/category.entity").Category | null>;
}
