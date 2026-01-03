import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // <-- Doğrusu bu olmalı (Post değil User)

export class UpdateUserDto extends PartialType(CreateUserDto) {}