import { PrismaClient } from "@prisma/client";
import { db } from "../db";

async function createTransaction({
  email,
  plan,
  stripeCustomerId,
  stripeSubscriptionId,
}: {
  email: string;
  plan: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}) {
  try {
    // Find the user based on their email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new transaction record in the database
    const transaction = await db.billing.create({
      data: {
        userId: user.id,
        plan,
        stripeSubscriptionId,
      },
    });

    return transaction;
  } catch (error: any) {
    throw new Error(`Failed to create transaction: ${error.message}`);
  }
}

export { createTransaction };
