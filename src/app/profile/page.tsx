import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Avatar, AvatarImage } from "../_components/avatar";
import { Button } from "../_components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/card";
import { MessageCircleIcon } from "../_components/icons";
import { Input } from "../_components/input";
import { Label } from "../_components/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../_components/tooltip";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session || !session?.user) {
    redirect("/");
  }

  const userPosts = await api.post.getPostsByUserId({
    userId: session.user.id,
  });

  return (
    <div className="container m-auto mt-5 flex h-full max-w-2xl flex-col gap-8 px-2">
      <header className="flex items-center gap-4 rounded-md bg-gray-100 p-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={session.user.image ?? ""} />
        </Avatar>

        <div className="grid gap-1">
          <div className="text-xl font-bold">{session?.user?.name}</div>
        </div>
      </header>
      <main className="grid flex-1 gap-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className=""></p>
              <div />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Activity</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <MessageCircleIcon className="0 h-6 w-6 text-[hsl(280,100%,70%)]" />
                <div>
                  <div className="text-sm font-medium">
                    Posted {userPosts.length ?? 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your personal information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={session.user.name ?? ""}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        id="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={session.user.email ?? ""}
                        disabled
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm">Email cannot be edited</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" disabled>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
