import classNames from "classnames";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

import { LinkButton, Button } from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { CheckIcon } from "./icons";

type Plan = {
  link: string;
  priceId: string;
  price: number;
  duration: string;
  name: string;
  description: string;
};

type PlanCardProps = {
  plan: Plan;
  isActive: boolean;
  isFeatured: boolean;
  hasActiveSub: boolean;
};

export const PlanCard: React.FC<PlanCardProps> = async ({
  plan,
  isActive,
  isFeatured,
  hasActiveSub,
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
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="text-4xl font-bold text-[hsl(280,100%,70%)]">
          £{plan.price}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <CheckIcon />
            <span>{plan.price} Posts</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PlanButton
          isFeatured={isFeatured}
          isActive={isActive}
          hasActiveSub={hasActiveSub}
          link={plan.link + "?prefilled_email=" + session?.user?.email}
        />
      </CardFooter>
    </Card>
  );
};

export function PlanButton({
  isFeatured,
  isActive,
  hasActiveSub,
  link,
}: {
  isFeatured: boolean;
  isActive: boolean;
  hasActiveSub: boolean;
  link: string;
}) {
  if (isActive) {
    return (
      <Button className="w-full" disabled>
        Active
      </Button>
    );
  }

  if (hasActiveSub)
    return <LinkButton className="w-full" href="/" text=" Contact sales" />;

  return (
    <LinkButton
      href={link}
      text="Get Started"
      className={classNames("w-full", {
        "animated-background 0 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-700 hover:to-purple-700":
          isFeatured,
      })}
    />
  );
}
