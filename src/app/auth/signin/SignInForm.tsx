"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle, FaDiscord } from "react-icons/fa";

import { Button } from "~/app/_components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/app/_components/card";
import { Input } from "~/app/_components/input";
import { Label } from "~/app/_components/label";

import logo from "../../../assets/placeholder.png";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

export default function SignInForm({ providers }: { providers: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case "google":
        return <FaGoogle />;
      case "discord":
        return <FaDiscord />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="flex flex-col items-center gap-3 text-3xl font-bold">
            <Image src={logo} alt={""} />
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-3 space-y-4">
          {false && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Button className="w-full" onClick={() => handleSubmit}>
                  Sign In
                </Button>

                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </>
          )}

          <div className="flex w-full flex-col items-center gap-2">
            {false && (
              <div className="flex items-center space-x-2">
                <span className="my-2 text-sm text-zinc-600">OR</span>
              </div>
            )}

            {providers &&
              Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials") {
                  return;
                }
                console.log(provider);
                return (
                  <Button
                    key={provider.name}
                    className="flex w-2/3 gap-2"
                    variant="default"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    {getProviderIcon(provider.id)} Sign in with {provider.name}
                  </Button>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
