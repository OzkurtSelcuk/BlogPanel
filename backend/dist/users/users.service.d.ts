import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOneByUsername(username: string): Promise<User | null>;
    findOne(id: number): Promise<User | null>;
    create(createUserDto: CreateUserDto & {
        adminKey?: string;
    }): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
