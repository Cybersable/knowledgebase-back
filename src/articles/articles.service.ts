import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    const slug = createArticleDto.categoryId + '-' + createArticleDto.title.replaceAll(' ', '-').toLowerCase();

    return this.prisma.article.create({
      data: {
        slug,
        ...createArticleDto,
      },
    });
  }

  async findAll({
    categoryId,
    skip,
    take,
  }: {
    categoryId: string
    skip: number
    take: number
  }): Promise<{
    data: Array<Omit<Article, 'content'>>
    total: number
  }> {
    const query = { where: {
        categoryId
      }
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        skip,
        take,
        where: query.where,
        omit: {
          content: true,
        }
      }),
      this.prisma.article.count(query)
    ]);

    return { data, total };
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({
      where: { id },
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
