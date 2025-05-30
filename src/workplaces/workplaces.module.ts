import { Module } from '@nestjs/common';
import { WorkplacesService } from './workplaces.service';
import { WorkplacesController } from './workplaces.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WorkplacesController],
  providers: [WorkplacesService, PrismaService],
})
export class WorkplacesModule {}
