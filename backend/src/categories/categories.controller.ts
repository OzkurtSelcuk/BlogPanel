import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: any) {
    // 1. Terminale gelen veriyi yazdıralım (Debug için)
    console.log("📥 Frontend'den Gelen Ham Veri:", body);

    // 2. Güvenlik Kontrolü: İsim alanı var mı?
    // Frontend { name: "Spor" } gönderiyorsa body.name çalışır.
    const name = body.name;

    if (!name) {
      console.error("❌ HATA: İsim alanı boş geldi!");
      throw new BadRequestException("Kategori ismi (name) zorunludur!");
    }

    // 3. Servise temiz veriyi yolla
    return this.categoriesService.create(name);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
}