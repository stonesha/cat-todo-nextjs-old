import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const todoRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: {
        userId: {
          equals: ctx.session.user.id,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }),
  add: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        complete_by: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.create({
        data: { ...input, userId: ctx.session.user.id },
      });
      return todo;
    }),
});
