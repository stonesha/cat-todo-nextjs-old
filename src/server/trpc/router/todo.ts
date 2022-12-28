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
  edit: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          userId: z.string().optional(),
          completed: z.boolean().optional(),
          completed_by: z.date().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const todo = await ctx.prisma.todo.update({
        where: { id },
        data,
      });
      return todo;
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.prisma.todo.delete({
        where: {
          id: id,
        },
      });
      return id;
    }),
});
