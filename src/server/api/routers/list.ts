import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { lists, tasks } from "~/server/db/schema";


export const listRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), boardId: z.number(), position: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(lists).values({
        name: input.name,
        boardId: input.boardId,
        position: input.position,
      });
    }),

    getAll: protectedProcedure
    .input(z.object({ boardId: z.number() }))
      .query(({ctx, input}) => {
        return ctx.db.query.lists.findMany({
          where: eq(lists.boardId, input.boardId),
        });
      }),

    delete: protectedProcedure
    .input(z.object({ listId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lists).where(eq(lists.id, input.listId))
      await ctx.db.delete(tasks).where(eq(tasks.listId, input.listId))
    }),
});