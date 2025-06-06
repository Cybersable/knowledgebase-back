import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.workspaceId + '-' + createCategoryDto.title.replaceAll(' ', '-').toLowerCase();
    
    return this.prisma.category.create({
      data: {
        slug,
        ...createCategoryDto
      },
    });
  }

  async findAll({
    skip,
    take,
    workspaceId,
  }: {
    skip: number
    take: number
    workspaceId: string
  }): Promise<{
    data: Category[]
    total: number
  }> {
    const query = {
      where: {
        workspaceId,
      }
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip,
        take,
        where: query.where,
      }),
      this.prisma.category.count(query)
    ])

    return { data, total };
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
