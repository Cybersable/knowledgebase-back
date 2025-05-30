import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createWorkplaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: createWorkplaceDto,
    });
  }

  findAll() {
    return this.prisma.workspace.findMany();
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

  update(id: string, updateWorkplaceDto: UpdateWorkspaceDto) {
    return this.prisma.workspace.update({
      where: { id },
      data: updateWorkplaceDto,
    });
  }

  remove(id: string) {
    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
