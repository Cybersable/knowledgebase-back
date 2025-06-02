import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma.service';
import {Workspace} from "@prisma/client";

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
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
    data: Workspace[]
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

  findOneBySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
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
