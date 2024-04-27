import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

export default async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  const latestPost = await api.post.getLatest();

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="rounded-md bg-white/10 p-5">
        {latestPost ? (
          <p className="mb-2 truncate">
            Your most recent post: {latestPost.name}
          </p>
        ) : (
          <p className="mb-2">You have no posts yet.</p>
        )}

        <CreatePost />
      </div>
    </div>
  );
}
