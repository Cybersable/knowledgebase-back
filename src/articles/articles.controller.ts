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
  Query
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() queryParams: FindAllArticleDto) {
    const skip = queryParams.limit * (queryParams.page - 1);

    return this.articlesService.findAll({
      categoryId: queryParams.categoryId,
      take: queryParams.limit,
      skip: skip,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.articlesService.findOneBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
