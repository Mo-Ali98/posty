import { api } from "~/trpc/server";
import PostCreation from "../_components/CrudShowcase";
import { DeleteButton } from "../_components/DeleteBtn";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../_components/card";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const latestPost = await api.post.getAll();

  const renderAllPosts = latestPost.map((post) => {
    return (
      <Card
        className="w-full overflow-hidden rounded-lg shadow-lg"
        key={post.id}
      >
        <CardHeader className="bg-gray-100">
          <CardTitle className="flex flex-row items-center justify-between text-xl font-bold">
            {post.title}
            <DeleteButton id={post.id} />
          </CardTitle>
        </CardHeader>
        <CardContent className="my-3">{post.description}</CardContent>
        <CardFooter className="flex flex-col">
          <p>By {post.createdBy.name}</p>
          <p>{new Date(post.updatedAt).toLocaleString()}</p>
        </CardFooter>
      </Card>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-4 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">Dashboard</span>
      </h1>
      <PostCreation />
      <h2 className="text-3xl font-bold underline">Posts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {renderAllPosts}
      </div>
    </div>
  );
}
