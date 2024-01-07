import { eq } from "drizzle-orm";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { tasks } from "~/server/db/schema";

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
    .input(z.object({ listId: z.number() }))
      .query(({ctx, input}) => {
        return ctx.db.query.tasks.findMany({
          where: eq(tasks.listId, input.listId),
        });
      })
});