import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    const slug =
      createCategoryDto.workspaceId +
      '-' +
      createCategoryDto.title.replaceAll(' ', '-').toLowerCase();

    return this.prisma.category.create({
      data: {
        slug,
        ...createCategoryDto,
      },
    });
  }

  async findAll({
    skip,
    take,
    workspaceId,
  }: {
    skip: number;
    take: number;
    workspaceId?: string;
  }): Promise<{
    data: Array<
      Category & {
        childrenCount: number;
      }
    >;
    total: number;
  }> {
    const query = {
      where: {
        ...(workspaceId
          ? {
              workspaceId,
            }
          : {}),
      },
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip,
        take,
        where: query.where,
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          workspaceId: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          _count: {
            select: {
              articles: true,
            },
          },
        },
      }),
      this.prisma.category.count(query),
    ]);

    const categories = data.map(({ _count, ...category }) => ({
      ...category,
      childrenCount: _count.articles,
    }));

    return { data: categories, total: Math.ceil(total / take) };
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        summary: true,
        workspace: {
          select: {
            id: true,
            title: true,
          },
        },
      },
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
