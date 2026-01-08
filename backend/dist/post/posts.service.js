"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const user_entity_1 = require("../users/entities/user.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
let PostsService = class PostsService {
    postRepository;
    userRepository;
    categoryRepository;
    tagRepository;
    constructor(postRepository, userRepository, categoryRepository, tagRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
    }
    async create(createPostDto) {
        const { title, content, userId, categoryId, tagIds } = createPostDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('Kullanıcı bulunamadı!');
        const category = await this.categoryRepository.findOneBy({ id: categoryId });
        if (!category)
            throw new common_1.NotFoundException('Kategori bulunamadı!');
        let tags = [];
        if (tagIds && tagIds.length > 0) {
            tags = await this.tagRepository.findBy({ id: (0, typeorm_2.In)(tagIds) });
        }
        const newPost = this.postRepository.create({ title, content, user, category, tags });
        return this.postRepository.save(newPost);
    }
    findAll() {
        return this.postRepository.find({
            relations: ['user', 'category', 'tags'],
            order: { id: 'DESC' }
        });
    }
    findOne(id) {
        return this.postRepository.findOne({
            where: { id },
            relations: ['user', 'category', 'tags'],
        });
    }
    async update(id, updatePostDto) {
        const post = await this.findOne(id);
        if (!post)
            throw new common_1.NotFoundException('Yazı bulunamadı');
        const { title, content, categoryId, tagIds } = updatePostDto;
        if (title)
            post.title = title;
        if (content)
            post.content = content;
        if (categoryId) {
            const category = await this.categoryRepository.findOneBy({ id: categoryId });
            if (category)
                post.category = category;
        }
        if (tagIds) {
            const tags = await this.tagRepository.findBy({ id: (0, typeorm_2.In)(tagIds) });
            post.tags = tags;
        }
        return this.postRepository.save(post);
    }
    async remove(id) {
        return this.postRepository.delete(id);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map