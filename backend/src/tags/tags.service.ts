import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  create(name: string) {
    if (!name) throw new Error("Etiket ismi boş olamaz!");
    const newTag = this.tagRepository.create({ name });
    return this.tagRepository.save(newTag);
  }

  findAll() {
    return this.tagRepository.find();
  }
  
  // ID listesine göre etiketleri bulmak için (İleride lazım olacak)
  findByIds(ids: number[]) {
      // TypeORM'un yeni sürümlerinde bu yöntem kullanılır
      return this.tagRepository.findByIds(ids);
  }
}