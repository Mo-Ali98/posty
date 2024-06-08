"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

import { LoadingSpinner } from "./loading";

type ButtonProps = {
  id: number;
};

export function DeleteButton({ id }: ButtonProps) {
  const router = useRouter();

  const { mutate, isPending: isLoading } = api.post.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button
      className="text-red-400 hover:text-red-600"
      onClick={() => mutate({ id })}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      ) : (
        <TrashIcon className="size-6" />
      )}
    </button>
  );
}
