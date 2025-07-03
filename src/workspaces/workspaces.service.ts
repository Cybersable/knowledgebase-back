import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from 'src/prisma.service';
import { Workspace } from '@prisma/client';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createWorkspaceDto: CreateWorkspaceDto) {
    const slug = createWorkspaceDto.title.replace(' ', '-');

    return this.prisma.workspace.create({
      data: {
        ...createWorkspaceDto,
        slug,
      },
    });
  }

  async findAll({ skip, take }: { skip: number; take: number }): Promise<{
    data: Array<Workspace>;
    total: number;
  }> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.workspace.findMany({
        skip,
        take,
      }),
      this.prisma.workspace.count(),
    ]);

    return { data, total: Math.ceil(total / take) };
  }

  findOne(id: string) {
    return this.prisma.workspace.findUnique({
      where: { id },
    });
  }

  update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.prisma.workspace.update({
      where: { id },
      data: updateWorkspaceDto,
    });
  }

  async remove(id: string) {
    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
