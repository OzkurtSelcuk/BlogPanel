// src/users/dto/create-user.dto.ts
export class CreateUserDto {
    username: string;
    password: string;
    role?: string; // İsteğe bağlı (doldurmazsan 'user' olur)
}