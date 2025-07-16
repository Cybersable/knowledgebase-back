import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const seedWorkspaces = (prisma: PrismaClient, count: number) => {
  const workspaces = faker.helpers
    .uniqueArray(() => faker.commerce.department(), count)
    .map((title) => ({
      title,
      slug: title.toLowerCase().replace(' ', '-'),
      summary: faker.company.catchPhrase(),
    }));

  return prisma.workspace.createMany({
    data: workspaces,
  });
};
