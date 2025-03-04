"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

import { Button } from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Confetti } from "./confetti";
import { Input } from "./input";
import { Label } from "./label";
import { Speech } from "./speech";
import { Textarea } from "./textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface CreatePost {
  disabled?: boolean;
}

export function CreatePost({ disabled }: CreatePost) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      setTitle("");
      setDesc("");

      await Confetti({ particleCount: 200, spread: 100 });
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ title, desc });
      }}
      className="flex flex-col gap-2"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-[hsl(280,100%,70%)]">
            Create New Post
          </CardTitle>
          <CardDescription>
            Add a new entry to your blog with a title and description.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <Textarea
                className="min-h-[300px]"
                id="content"
                placeholder="Write your entry in Markdown"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Speech setDescription={setDesc} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {disabled ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button type="button" disabled={disabled}>
                    Submit
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm">
                    You have reached the limit! <br /> Please{" "}
                    <Link href="/pricing" className="underline">
                      upgrade
                    </Link>{" "}
                    to continue posting
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              type="submit"
              disabled={
                createPost.isPending ||
                disabled ||
                title.length < 1 ||
                desc.length < 1
              }
            >
              {createPost.isPending ? "Submitting..." : "Submit"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
