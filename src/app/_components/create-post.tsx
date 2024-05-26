"use client";

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
import { Label } from "./label";

import { Input } from "./input";
import { Textarea } from "./textarea";

export function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
      setDesc("");
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
            <Textarea
              className="min-h-[300px]"
              id="content"
              placeholder="Write your entry in Markdown"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={createPost.isPending}>
            {createPost.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
