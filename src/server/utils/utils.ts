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

async function handleSubscriptionDeleted({
  email,
  stripeCustomerId,
  stripeSubscriptionId,
}: {
  email: string;
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

    // Get the account associated with the user that matches the Stripe customer ID
    const account = user.accounts.find(
      (acc) => acc.stripeCustomerId === stripeCustomerId,
    );

    if (!account) {
      throw new Error("User account not found");
    }

    // Find the billing record based on the Stripe subscription ID
    const billingRecord = await db.billing.findUnique({
      where: { stripeSubscriptionId: stripeSubscriptionId },
    });

    if (!billingRecord) {
      throw new Error("Billing record not found");
    }

    // Remove the subscription (assuming 'delete' method is used to remove the record)
    await db.billing.delete({
      where: { id: billingRecord.id },
    });

    return { message: "Subscription deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error here
      throw new Error(`Failed to delete subscription: ${error.message}`);
    } else {
      throw new Error(`Failed to delete subscription: Unknown error`);
    }
  }
}

async function getEmailByStripeCustomerId(
  stripeCustomerId: string,
): Promise<string | null> {
  const account = await db.account.findUnique({
    where: { stripeCustomerId },
    include: { user: true },
  });

  return account?.user?.email ?? null;
}

export {
  createTransaction,
  getEmailByStripeCustomerId,
  handleSubscriptionDeleted,
};
