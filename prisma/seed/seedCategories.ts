import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const seedCategories = async (prisma: PrismaClient, count: number) => {
  const workspacesIds = await prisma.workspace.findMany({
    select: { id: true },
  });

  return Promise.all(
    workspacesIds.map(({ id }) => {
      const categories = faker.helpers
        .uniqueArray(() => faker.commerce.product(), count)
        .map((title) => ({
          title,
          slug: title.replace(' ', '-'),
          summary: faker.commerce.productDescription(),
          workspaceId: id,
        }));

      return prisma.category.createMany({
        data: categories,
      });
    }),
  );
};
