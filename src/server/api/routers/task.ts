import { eq, getTableColumns, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { boards, lists, tasks } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), listId: z.number(), position: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        name: input.name,
        listId: input.listId,
        position: input.position,
      });
    }),

    getAll: protectedProcedure
    .input(z.object({ boardId: z.number() }))
      .query(({ctx, input}) => {  
       return ctx.db.select({
          ...getTableColumns(tasks)
        })
        .from(tasks)
        .innerJoin(lists, eq(tasks.listId, lists.id))
        .where(eq(lists.boardId, input.boardId))
      }),

    getById: protectedProcedure
    .input(z.object({ taskId: z.number() }))
      .query(({ctx, input}) => {
        return ctx.db.query.tasks.findMany({
          where: eq(tasks.id, input.taskId),
        });
      }),

      updateDecription: protectedProcedure
      .input(z.object({ description: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        await ctx.db.update(tasks).set({
          description: input.description
        })
      }),
});