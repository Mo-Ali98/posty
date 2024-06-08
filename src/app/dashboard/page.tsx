import Link from "next/link";
import { api } from "~/trpc/server";
import PostCreation from "../_components/CrudShowcase";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "../_components/card";
import GradualSpacing from "../_components/text-animation";
import { CalendarIcon, UserIcon } from "../_components/icons";

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
          <Link href={`/post/${post.id}`} className="mt-2 flex items-center">
            <span className="text-sm text-[hsl(280,100%,70%)] hover:text-[hsl(280,72%,56%)]">
              View post
            </span>
          </Link>
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
