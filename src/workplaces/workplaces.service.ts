import { Injectable } from '@nestjs/common';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { UpdateWorkplaceDto } from './dto/update-workplace.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkplacesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createWorkplaceDto: CreateWorkplaceDto) {
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

  update(id: string, updateWorkplaceDto: UpdateWorkplaceDto) {
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
