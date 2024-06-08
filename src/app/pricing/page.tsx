import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { PlanCard } from "../_components/planCard";
import { plans } from "../_components/plans";
import GradualSpacing from "../_components/text-animation";
export default async function PricingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const billing = await api.billing.getBillingDataByUserId({
    userId: session.user.id,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-4 text-white">
      <GradualSpacing
        className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-[hsl(280,100%,70%)] md:text-7xl md:leading-[5rem] "
        text={`Pricing`}
      />

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
