import { redirect } from "next/navigation";
import ArrowUpBtn from "~/app/_components/arrow-up";
import { Card } from "~/app/_components/card";
import { CalendarIcon, UserIcon } from "~/app/_components/icons";
import ScrollBarProgress from "~/app/_components/scroll-progress";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await api.post.getSinglePost({ id: params.slug });

  if (!post) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Card className="mx-auto mt-5 max-w-3xl p-6 sm:p-6 md:p-8 lg:p-10">
        <div className="not-prose space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(280,100%,70%)] lg:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-black">
              <CalendarIcon className="inline-block h-4 w-4 text-[hsl(280,100%,70%)]" />
              Published on {new Date(post.updatedAt).toDateString()}
            </p>
            <div className="flex items-center gap-2">
              <UserIcon className="inline-block h-4 w-4 text-[hsl(280,100%,70%)]" />
              <p className="text-black">By {post.createdBy.name}</p>
            </div>
          </div>
        </div>
        <div className="prose prose-gray dark:prose-invert mt-6">
          <p>{post.description}</p>
        </div>
      </Card>
      <ScrollBarProgress />
      <ArrowUpBtn />
    </div>
  );
}
