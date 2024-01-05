import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { boards } from "~/server/db/schema";

export const boardRouter = createTRPCRouter({
  createBoard: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(boards).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

    getAllBoards: protectedProcedure
      .query(({ctx}) => {
        return ctx.db.query.boards.findMany({
          where: eq(boards.createdById, ctx.session.user.id),
        });
      }),
});
