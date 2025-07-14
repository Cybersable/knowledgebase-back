import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClientExtended } from './prisma.client';

@Injectable()
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}
