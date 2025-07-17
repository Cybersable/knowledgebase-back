import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.articlesService.create(createArticleDto);
    return this.articlesService.findOne(article.id);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() queryParams: FindAllArticleDto) {
    const skip = queryParams.limit * (queryParams.page - 1);

    return this.articlesService.findAll({
      categoryId: queryParams.categoryId,
      workspaceId: queryParams.workspaceId,
      search: queryParams.search,
      take: queryParams.limit,
      skip: skip,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(id);

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not exist.`);
    }

    return article;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    await this.articlesService.update(id, updateArticleDto);
    return this.articlesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
