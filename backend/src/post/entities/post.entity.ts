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

  // İLİŞKİ 1: Yazıyı kim yazdı? (User tablosuna bağlanır)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  // İLİŞKİ 2: Hangi kategoride? (Category tablosuna bağlanır)
  @ManyToOne(() => Category, (category) => category.posts, { nullable: true })
  category: Category;

  // İLİŞKİ 3: Hangi etiketler var? (Tag tablosuna bağlanır)
  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable() // Çoka-çok ilişkide bu dekoratör ŞARTTIR!
  tags: Tag[];
}