import { faker } from '@faker-js/faker';

export function fakeWorkspace() {
  return {
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
    summary: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeWorkspaceComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
    summary: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeCategory() {
  return {
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
    summary: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeCategoryComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
    summary: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
    workspaceId: faker.string.uuid(),
  };
}
export function fakeArticle() {
  return {
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
    summary: undefined,
    content: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeArticleComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
    summary: undefined,
    content: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
    categoryId: faker.string.uuid(),
  };
}
