import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
    search,
    skip,
    take,
  }: {
    workspaceId?: string;
    categoryId?: string;
    search?: string;
    skip: number;
    take: number;
  }): Promise<{
    data: Array<
      Omit<Article, 'content' | 'updatedAt' | 'createdAt' | 'deletedAt'> & {
        categoryId: string;
        categoryTitle: string;
        workspaceId: string;
        workspaceTitle: string;
      }
    >;
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
        ...(search
          ? {
              title: {
                search,
              },
              summary: {
                search,
              },
              content: {
                search,
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
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          categoryId: true,
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
      }),
      this.prisma.article.count(query),
    ]);

    const articles = data.map(({ category, ...article }) => ({
      ...article,
      categoryId: category.id,
      categoryTitle: category.title,
      workspaceId: category.workspace.id,
      workspaceTitle: category.workspace.title,
    }));

    return { data: articles, total: Math.ceil(total / take) };
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
      .then(({ category, ...args }) => ({
        ...args,
        categoryId: category.id,
        categoryTitle: category.title,
        workspaceId: category.workspace.id,
        workspaceTitle: category.workspace.title,
      }));
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
