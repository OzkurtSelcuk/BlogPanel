import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Bir kategoride çok yazı olabilir (Bire-Çok İlişki)
  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}