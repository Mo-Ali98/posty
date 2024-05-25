import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../_components/card";
import { Button, LinkButton } from "../_components/button";
import { JSX, SVGProps } from "react";

export default async function PricingPage() {
  const plans = [
    {
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
      link:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_aEU16K8B15cibGEaEG"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PKR6KRwYtrOJacvspFeAFsn"
          : "",
      price: 9,
      duration: "/month",
    },
    {
      link:
        process.env.NODE_ENV === "development"
          ? "https://buy.stripe.com/test_00gbLo8B17kq5ig6op"
          : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PKR6fRwYtrOJacvC9eEa9xJ"
          : "",
      price: 9,
      duration: "/month",
    },
  ];

  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-4 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Pricing</span>
      </h1>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[hsl(280,100%,70%)]">
                    Basic
                  </CardTitle>
                  <CardDescription>
                    Perfect for individuals and small teams.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold text-[hsl(280,100%,70%)]">
                    £9
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>1 user</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>5 GB storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>Basic features</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <LinkButton
                    href={
                      plans[0]?.link +
                      "?prefilled_email=" +
                      session?.user?.email
                    }
                    text="Get Started"
                    className="w-full"
                    target="_blank"
                  />
                </CardFooter>
              </Card>
              <Card className="relative  border-2 border-purple-500">
                <div className="absolute left-1/2 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-[hsl(280,100%,70%)]">
                    Pro
                  </CardTitle>
                  <CardDescription>
                    Ideal for growing teams and small businesses.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold text-[hsl(280,100%,70%)]">
                    £29
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
                  <LinkButton
                    href={
                      plans[1]?.link +
                      "?prefilled_email=" +
                      session?.user?.email
                    }
                    text="Get Started"
                    className="animated-background 0 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-700 hover:to-purple-700"
                    target="_blank"
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[hsl(280,100%,70%)]">
                    Enterprise
                  </CardTitle>
                  <CardDescription>
                    Tailored for large teams and organizations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold text-[hsl(280,100%,70%)]">
                    £99
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>Unlimited users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>Unlimited storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span>Enterprise features</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <LinkButton
                    href={
                      plans[2]?.link +
                      "?prefilled_email=" +
                      session?.user?.email
                    }
                    text="Get Started"
                    className="w-full"
                    target="_blank"
                  />{" "}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
