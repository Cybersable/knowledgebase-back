import { PrismaClient } from '@prisma/client';
import { seedWorkspaces } from './seedWorkspaces';
import { seedCategories } from './seedCategories';
import { seedArticles } from './seedArticles';

const prisma = new PrismaClient();

const seed = async () => {
  console.log('Seeding...');

  await seedWorkspaces(prisma, 12);
  await seedCategories(prisma, 12);
  await seedArticles(prisma, 12);

  console.log('Seeding done.');
};

seed()
  .then()
  .catch((e) => console.error(e))
  .finally(() => {
    (async () => {
      await prisma.$disconnect();
    })().then(() => console.log('Prisma client disconnected.'));
  });
