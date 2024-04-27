import { api } from "~/trpc/server";
import CrudShowcase from "../_components/CrudShowcase";
import { DeleteButton } from "../_components/DeleteBtn";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const latestPost = await api.post.getAll();

  const renderAllPosts = latestPost.map((post) => {
    return (
      <div
        key={post.id}
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4"
      >
        <div className="flex flex-row justify-between">
          <p className="text-center text-2xl font-bold">{post.name}</p>
          <DeleteButton id={post.id} />
        </div>
        <div className="py-3">
          <p>By {post.createdBy.name}</p>
        </div>
        <div className="text-sm">
          {new Date(post.updatedAt).toLocaleString()}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-4 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Dashboard</span>
      </h1>
      <CrudShowcase />
      <h2 className="text-3xl font-bold underline">Posts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {renderAllPosts}
      </div>
    </div>
  );
}
