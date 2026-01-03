import { Controller, Get, Post, Body } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() body: any) {
    console.log("Gelen Etiket:", body);
    return this.tagsService.create(body.name);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
}