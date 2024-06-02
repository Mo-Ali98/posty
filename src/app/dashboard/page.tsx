import { api } from "~/trpc/server";
import PostCreation from "../_components/CrudShowcase";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "../_components/card";
import { JSX, SVGProps } from "react";
import GradualSpacing from "../_components/text-animation";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const latestPost = await api.post.getAll();

  const renderAllPosts = latestPost.map((post) => {
    return (
      <Card
        className="h-full overflow-hidden rounded-lg shadow-lg"
        key={post.id}
      >
        <CardContent className="flex h-full flex-col justify-between p-6">
          <h2 className="my-3 mt-5 text-xl font-bold text-[hsl(280,100%,70%)]">
            {post.title}
          </h2>
          <p className="my-4 line-clamp-5 text-black">{post.description}</p>
          <div className="mt-auto flex flex-col gap-2 text-sm text-black">
            <div className="flex flex-row items-center gap-1">
              <UserIcon className="mr-1 inline-block h-4 w-4 text-[hsl(280,100%,70%)]" />
              <p>{post.createdBy.name}</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <CalendarIcon className="mr-1 inline-block h-4 w-4 text-[hsl(280,100%,70%)]" />
              {new Date(post.updatedAt).toDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-4 text-white">
      <GradualSpacing
        className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-[hsl(280,100%,70%)] md:text-7xl md:leading-[5rem] "
        text={`Dashboard`}
      />

      <PostCreation />
      <h2 className="text-3xl font-bold underline">Posts</h2>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renderAllPosts}
        </div>
      </div>
    </div>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
