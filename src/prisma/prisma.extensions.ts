import { Prisma } from '@prisma/client';

export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        where: Prisma.Args<M, 'delete'>['where'],
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        return (context as any).update({
          where,
          data: {
            deleted_at: new Date(),
          },
        });
      },
    },
  },
});

export const softDeleteMany = Prisma.defineExtension({
  name: 'softDeleteMany',
  model: {
    $allModels: {
      async deleteMany<M, A>(
        this: M,
        where: Prisma.Args<M, 'deleteMany'>['where'],
      ): Promise<Prisma.Result<M, A, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        return (context as any).updateMany({
          where,
          data: {
            deleted_at: new Date(),
          },
        });
      },
    },
  },
});

export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ operation, args, query }) {
        if (
          operation === 'findUnique' ||
          operation === 'findFirst' ||
          operation === 'findMany'
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          args.where = { ...args.where, deleted_at: null };
          return query(args);
        }
        return query(args);
      },
    },
  },
});
