import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    login(loginData: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: string;
            posts: import("../post/entities/post.entity").Post[];
        };
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
