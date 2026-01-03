// src/categories/categories.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity'; // Kendi Entity yolunu kontrol et

@Module({
  // 👇 BU KISIM EKSİK OLABİLİR:
  imports: [TypeOrmModule.forFeature([Category])], 
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService] // Eğer başka modüllerde kullanacaksan
})
export class CategoriesModule {}