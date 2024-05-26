import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";

export default async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return <CreatePost />;
}
