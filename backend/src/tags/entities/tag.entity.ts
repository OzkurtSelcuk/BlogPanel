import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Etiketler ve Postlar arasında Çoka-Çok ilişki
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}