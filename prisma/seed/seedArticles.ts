import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const seedArticlesContentHeader = (id: string) => {
  return {
    id,
    type: 'header',
    data: {
      text: faker.lorem.sentence(),
      level: 3,
    },
  };
};

const seedArticlesContentParagraph = (id: string) => {
  return {
    id,
    type: 'paragraph',
    data: {
      text: faker.lorem.paragraph(),
    },
  };
};

const seedArticlesContent = () => {
  const time = new Date();

  const blocksIds = faker.helpers.uniqueArray(
    () => faker.string.sample(10),
    faker.number.int({ min: 2, max: 10 }),
  );

  let lastBlock = 2;

  const blocks = [
    seedArticlesContentHeader(blocksIds.shift()),
    seedArticlesContentParagraph(blocksIds.shift()),
    ...blocksIds.map((id, index) => {
      if (index !== blocksIds.length - 1) {
        if (lastBlock === 1) {
          lastBlock = 2;
          return seedArticlesContentParagraph(id);
        }

        if (faker.number.int({ min: 1, max: 2 }) === 1) {
          lastBlock = 1;
          return seedArticlesContentHeader(id);
        }

        lastBlock = 2;
        return seedArticlesContentParagraph(id);
      }

      return seedArticlesContentParagraph(id);
    }),
  ];

  return {
    time,
    blocks,
  };
};

export const seedArticles = async (prisma: PrismaClient, count: number) => {
  const categoriesIds = await prisma.category.findMany({
    select: { id: true },
  });

  return Promise.all(
    categoriesIds.map(({ id }) => {
      const articles = faker.helpers
        .uniqueArray(() => faker.lorem.sentence({ min: 3, max: 7 }), count)
        .map((title) => ({
          title,
          slug: title.toLowerCase().replace(' ', '-'),
          summary: faker.lorem.sentence({ min: 10, max: 20 }),
          categoryId: id,
          content: JSON.stringify(seedArticlesContent()),
        }));

      return prisma.article.createMany({
        data: articles,
      });
    }),
  );
};
