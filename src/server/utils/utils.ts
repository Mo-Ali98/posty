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
      include: { accounts: true }, // Include related accounts
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Get the first account associated with the user
    const account = user.accounts[0];

    if (!account) {
      throw new Error("User account not found");
    }

    // Check if the account has a Stripe customer ID, and update if not
    if (!account.stripeCustomerId) {
      await db.account.update({
        where: { id: account.id },
        data: { stripeCustomerId },
      });
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
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error here
      throw new Error(`Failed to create transaction: ${error.message}`);
    } else {
      throw new Error(`Failed to create transaction: Unknown error`);
    }
  }
}

export { createTransaction };
