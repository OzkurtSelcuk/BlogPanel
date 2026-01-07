import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

 
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  
  @ManyToOne(() => Category, (category) => category.posts, { nullable: true })
  category: Category;

  
  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable() 
  tags: Tag[];
}