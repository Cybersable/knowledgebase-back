import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import {Category} from "@prisma/client";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll({
    skip,
    take,
  }: {
    skip: number
    take: number
  }): Promise<{
    data: Category[]
    total: number
  }> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip,
        take,
      }),
      this.prisma.category.count()
    ])

    return { data, total };
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  findOneBySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
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
