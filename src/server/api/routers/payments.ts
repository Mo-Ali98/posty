import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const paymentsRouter = createTRPCRouter({
  getBillingData: protectedProcedure.query(({ ctx }) => {
    return ctx.db.billing.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getBillingDataByUserId: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const billingData = await ctx.db.billing.findFirst({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
      });
      return billingData;
    }),
});
