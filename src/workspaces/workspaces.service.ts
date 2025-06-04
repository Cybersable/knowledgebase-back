import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from 'src/prisma.service';
import { Workspace } from '@prisma/client';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: createWorkspaceDto,
    });
  }

  findAllSummary() {
    return this.prisma.workspace.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
      }
    })
  }

  async findAll({
    skip,
    take,
  }: {
    skip: number
    take: number
  }): Promise<{
    data: Workspace[]
    total: number
  }> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.workspace.findMany({
        skip,
        take,
      }),
      this.prisma.workspace.count()
    ]);

    return { data, total };
  }

  findOne(id: string) {
    return this.prisma.workspace.findUnique({
      where: { id },
    });
  }

  findOneBySlug(slug: string) {
    return this.prisma.workspace.findUnique({
      where: { slug },
    });
  }

  findAllDocs() {
    return this.prisma.workspace.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
      }
    })
  }

  findOneDocs(slug: string) {
    const fields = {
      id: true,
      slug: true,
      title: true,
      summary: true,
    };

    return this.prisma.workspace.findUnique({
        where: { slug },
        select: {
          ...fields,
          categories: {
            select: {
              ...fields,
              articles: {
                select: fields,
              }
            }
          }
        }
      });
  }

  update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.prisma.workspace.update({
      where: { id },
      data: updateWorkspaceDto,
    });
  }

  remove(id: string) {
    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
