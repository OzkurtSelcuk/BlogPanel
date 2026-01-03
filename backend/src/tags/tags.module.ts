import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- EKLENDİ
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './entities/tag.entity'; // <-- EKLENDİ

@Module({
  imports: [TypeOrmModule.forFeature([Tag])], // <-- BU SATIR ÖNEMLİ
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}