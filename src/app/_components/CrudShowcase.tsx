import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { hasReachedLimit } from "~/server/utils/utils";
import { api } from "~/trpc/server";

export default async function PostCreation() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getAll();

  const billing = await api.billing.getBillingDataByUserId({
    userId: session.user.id,
  });

  const canPost = hasReachedLimit({
    currentPosts: latestPost.length,
    currentPlan: billing?.plan ?? "",
  });

  return <CreatePost disabled={!canPost} />;
}
