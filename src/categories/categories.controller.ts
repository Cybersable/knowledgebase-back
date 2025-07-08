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
import { CategoriesService } from './categories.service';
import { FindAllCategoryDto } from './dto/find-all-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() queryParams: FindAllCategoryDto) {
    const skip = queryParams.limit * (queryParams.page - 1);

    return this.categoriesService.findAll({
      take: queryParams.limit,
      skip: skip,
      workspaceId: queryParams.workspaceId,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);

    if (!category) {
      throw new NotFoundException(
        `Category with id ${id} does not found exist.`,
      );
    }

    return {
      id: category.id,
      title: category.title,
      summary: category.summary,
      workspaceId: category.workspace.id,
      workspaceTitle: category.workspace.title,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
