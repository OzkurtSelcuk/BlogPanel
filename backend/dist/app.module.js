"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./post/posts.module");
const categories_module_1 = require("./categories/categories.module");
const tags_module_1 = require("./tags/tags.module");
const user_entity_1 = require("./users/entities/user.entity");
const post_entity_1 = require("./post/entities/post.entity");
const category_entity_1 = require("./categories/entities/category.entity");
const tag_entity_1 = require("./tags/entities/tag.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: 'postgresql://neondb_owner:npg_4WgdDEF8fIHt@ep-young-leaf-agqc3455-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require',
                entities: [user_entity_1.User, post_entity_1.Post, category_entity_1.Category, tag_entity_1.Tag],
                synchronize: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            users_module_1.UsersModule,
            posts_module_1.PostsModule,
            categories_module_1.CategoriesModule,
            tags_module_1.TagsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
