import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

import { PlanCard } from "../_components/planCard";

export default async function PricingPage() {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small teams.",
      link:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_3cs9Dg9F5gV09ywcMM"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PKQBIRwYtrOJacvkwGQeU5m"
          : "",
      price: 9,
      duration: "/month",
    },
    {
      name: "Pro",
      description: "Ideal for growing teams and small businesses.",

      link:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_aEU16K8B15cibGEaEG"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PKR6KRwYtrOJacvspFeAFsn"
          : "",
      price: 29,
      duration: "/month",
    },
    {
      name: "Enterprise",
      description: "Tailored for large teams and organizations.",

      link:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_00gbLo8B17kq5ig6op"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PKR6fRwYtrOJacvC9eEa9xJ"
          : "",
      price: 99,
      duration: "/month",
    },
  ];

  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const billing = await api.billing.getBillingDataByUserId({
    userId: session.user.id,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-4 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Pricing</span>
      </h1>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <PlanCard
                  key={index}
                  plan={plan}
                  isActive={plan.name === billing?.plan}
                  isFeatured={plan.name === "Pro"}
                  hasActiveSub={Boolean(billing)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
