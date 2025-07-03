import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    const slug =
      createArticleDto.categoryId +
      '-' +
      createArticleDto.title.replaceAll(' ', '-').toLowerCase();

    return this.prisma.article.create({
      data: {
        slug,
        ...createArticleDto,
      },
    });
  }

  async findAll({
    workspaceId,
    categoryId,
    skip,
    take,
  }: {
    workspaceId?: string;
    categoryId?: string;
    skip: number;
    take: number;
  }): Promise<{
    data: Array<Omit<Article, 'content'>>;
    total: number;
  }> {
    const query = {
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(workspaceId
          ? {
              category: {
                workspaceId,
              },
            }
          : {}),
      },
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        skip,
        take,
        where: query.where,
        omit: {
          content: true,
        },
      }),
      this.prisma.article.count(query),
    ]);

    return { data, total: Math.ceil(total / take) };
  }

  findOne(id: string) {
    return this.prisma.article
      .findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          content: true,
          updatedAt: true,
          category: {
            select: {
              id: true,
              title: true,
              workspace: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      })
      .then(({ category, ...args }) => {
        return {
          ...args,
          categoryId: category.id,
          categoryTitle: category.title,
          workspaceId: category.workspace.id,
          workspaceTitle: category.workspace.title,
        };
      });
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
