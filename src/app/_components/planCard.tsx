import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

import { LinkButton, Button } from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { SVGProps } from "react";
import classNames from "classnames";

type Plan = {
  link: string;
  priceId: string;
  price: number;
  duration: string;
  name: string;
};

type PlanCardProps = {
  plan: Plan;
  isActive: boolean;
  isFeatured: boolean;
};

export const PlanCard: React.FC<PlanCardProps> = async ({
  plan,
  isActive,
  isFeatured,
}) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Card
      className={classNames({
        "relative border-2 border-purple-500": isFeatured,
      })}
    >
      {isFeatured && (
        <div className="absolute left-1/2 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white">
          Popular
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl text-[hsl(280,100%,70%)]">
          {plan.name}
        </CardTitle>
        <CardDescription>
          Ideal for growing teams and small businesses.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="text-4xl font-bold text-[hsl(280,100%,70%)]">
          £{plan.price}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <CheckIcon />
            <span>5 users</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon />
            <span>50 GB storage</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon />
            <span>Advanced features</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isActive ? (
          <LinkButton
            href={plan.link + "?prefilled_email=" + session?.user?.email}
            text="Get Started"
            className={classNames("w-full", {
              "animated-background 0 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-700 hover:to-purple-700":
                isFeatured,
            })}
          />
        ) : (
          <Button className="w-full" disabled>
            Active
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className="text-[hsl(280,100%,70%)]"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
