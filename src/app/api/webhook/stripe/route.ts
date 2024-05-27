import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { env } from "~/env"; // Ensure this import is correct and env is typed
import { type NextRequest } from "next/server";

import {
  createTransaction,
  getEmailByStripeCustomerId,
  handleSubscriptionDeleted,
} from "../../../../server/utils/utils";
// Initialize Stripe
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

//TO TEST us ngrok ngrok http --domain=positively-ultimate-joey.ngrok-free.app 3000

async function handleStripeWebhook(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  const body = await req.text();

  const signature = headers().get("stripe-signature");

  let event: Stripe.Event;

  // Verify Stripe event is legit
  try {
    if (!signature || !webhookSecret) {
      throw new Error("Missing signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Webhook signature verification failed. ${error.message}`);
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else {
      // Handle other types of errors
      console.error("Webhook signature verification failed. Unknown error.");
      return new NextResponse(JSON.stringify({ error: "Unknown error" }), {
        status: 400,
      });
    }
  }

  const data = event.data;
  const eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const checkoutEventData = event.data.object;

        console.log("Checkout session completed", data);

        const customerEmail = checkoutEventData.customer_details?.email;
        if (!customerEmail) {
          console.log("Customer email not provided.");
        }

        const stripeCustomerId = checkoutEventData.customer as string;
        const stripeSubscriptionId = checkoutEventData.subscription as string;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          checkoutEventData.id,
        );

        if (!lineItems?.data?.length) {
          console.log("No line items found for this session.");
        }

        // Assuming the first item is the product
        const productId = lineItems?.data?.[0]?.price?.product as string;

        if (!productId) {
          console.log("Product ID not found for the line item.");
        }

        // Fetch product details from Stripe
        const product = await stripe.products.retrieve(productId);

        const productName = product?.name ?? "Unknown Product";

        // Ensure customerEmail and productName are non-null and non-undefined

        if (customerEmail && productName) {
          await createTransaction({
            email: customerEmail,
            plan: productName,
            stripeCustomerId,
            stripeSubscriptionId,
          });
        } else {
          // Handle the case when customerEmail or productName is null or undefined
          console.error("Customer email or product name is not available.");
        }

        break;
      }

      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        console.log("Subscription deleted", data);

        const subscriptionEventData = event.data.object;

        const stripeCustomerId = subscriptionEventData.customer as string;
        const stripeSubscriptionId = subscriptionEventData.id;

        const customerEmail =
          await getEmailByStripeCustomerId(stripeCustomerId);
        if (!customerEmail) {
          console.log("Customer email not found.");
          return NextResponse.json(
            { error: "Customer email not found" },
            { status: 400 },
          );
        }

        await handleSubscriptionDeleted({
          email: customerEmail,
          stripeCustomerId,
          stripeSubscriptionId,
        });
        break;
      }

      default:
        console.warn(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Stripe error: ${error.message} | EVENT TYPE: ${eventType}`,
      );
    } else {
      // Handle other types of errors
      console.error(`Stripe error: Unknown error | EVENT TYPE: ${eventType}`);
    }
  }

  return new NextResponse("Webhook event processed successfully", {
    status: 200,
  });
}

export { handleStripeWebhook as POST };
