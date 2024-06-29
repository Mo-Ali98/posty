import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

import {
  CardHeader,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./_components/card";
import { CheckIcon } from "./_components/icons";
import { MarqueeDemo } from "./_components/marquee";
import { PlanButton } from "./_components/planCard";
import GradualSpacing from "./_components/text-animation";
import placeholder from "../assets/placeholder.svg";

export default async function Home() {
  const session = await getServerAuthSession();

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small teams.",
      link: "/api/auth/signin",
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
      link: "/api/auth/signin",
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
      link: "/api/auth/signin",
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PKR6fRwYtrOJacvC9eEa9xJ"
          : "",
      price: 99,
      duration: "/month",
    },
  ];

  if (!session) {
    return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="space-y-10 px-4 md:px-6 xl:space-y-16">
            <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
              <div>
                <h1 className="lg:leading-tighter my-2 text-center text-3xl font-bold tracking-tighter text-[hsl(280,100%,70%)] sm:text-4xl md:text-left md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Share Your Thoughts with the World
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Thought Sharing is a platform that allows you to easily share
                  your thoughts, ideas, and experiences with others. Connect
                  with like-minded individuals and build a community around your
                  passions.
                </p>
                <div className="mt-4 space-x-4">
                  <Link
                    href="/api/auth/signin"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <Image
                src={placeholder} // eslint-disable-line @typescript-eslint/no-unsafe-assignment
                alt="Hero"
                className="mx-auto aspect-[2/1] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[hsl(280,100%,70%)] px-3 py-1 text-sm text-white">
                  Key Features
                </div>

                <h1 className="lg:leading-tighter my-2 text-3xl font-bold tracking-tighter text-[hsl(280,100%,70%)] sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Elevate Your Thought Sharing Experience
                </h1>

                <p className="mx-auto max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Thought Sharing offers a range of features to help you connect
                  with others, express your ideas, and build a thriving
                  community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid h-[160px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold text-[hsl(280,100%,70%)] sm:text-left">
                  Intuitive Posting
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Easily create and share your thoughts with a simple and
                  user-friendly interface.
                </p>
              </div>
              <div className="grid h-[160px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold text-[hsl(280,100%,70%)] sm:text-left">
                  Engaging Discussions
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Participate in thought-provoking discussions and connect with
                  like-minded individuals.
                </p>
              </div>
              <div className="grid h-[160px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold text-[hsl(280,100%,70%)] sm:text-left">
                  Personalized Feeds
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Customize your feed to see the content that matters most to
                  you.
                </p>
              </div>
              <div className="grid h-[160px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold text-[hsl(280,100%,70%)] sm:text-left">
                  Collaborative Tools
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Utilize collaborative features like comments, likes, and
                  sharing to enhance your thought sharing experience.
                </p>
              </div>
              <div className="grid h-[160px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold text-[hsl(280,100%,70%)] sm:text-left">
                  Insightful Analytics
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Track the performance of your posts and gain valuable insights
                  to improve your content.
                </p>
              </div>
              <div className="grid h-[160px] gap-1 rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-center text-lg font-bold text-[hsl(280,100%,70%)] sm:text-left">
                  Seamless Integration
                </h3>
                <p className="text-center text-sm text-gray-500 sm:text-left">
                  Integrate Thought Sharing with your existing workflows and
                  tools for a seamless experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="lg:leading-tighter my-2 text-3xl font-bold tracking-tighter text-[hsl(280,100%,70%)] sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Testimonials
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from our satisfied customers about their experience with
                  Thought Sharing.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-xs md:max-w-5xl">
              <MarqueeDemo />
            </div>
          </div>
        </section>

        <section className="w-full pb-12 md:pb-24 lg:pb-32">
          <div className="space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <GradualSpacing
                  className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-[hsl(280,100%,70%)] md:text-6xl md:leading-[5rem]"
                  text={`Pricing`}
                />
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                  Unlock Your Thought Sharing Potential
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that best suits your needs and start sharing
                  your thoughts with the world.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <Card
                    className={classNames({
                      "relative border-2 border-purple-500":
                        plan.name === "Pro",
                    })}
                    key={index}
                  >
                    {plan.name === "Pro" && (
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
                        isFeatured={plan.name === "Pro"}
                        isActive={false}
                        hasActiveSub={false}
                        link={plan.link}
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center text-white">
      <div className="container flex flex-col justify-center gap-4 px-4">
        <GradualSpacing
          className="font-display text-center text-2xl font-bold tracking-[-0.1em] text-black md:text-7xl md:leading-[5rem] dark:text-white"
          text={`Welcome`}
        />
        <GradualSpacing
          className="font-display text-center text-2xl font-bold tracking-[-0.1em] text-black md:text-7xl md:leading-[5rem] dark:text-white"
          text={`${session?.user?.name}`}
        />
      </div>
    </main>
  );
}
