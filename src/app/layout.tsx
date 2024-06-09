import "~/styles/globals.css";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./_components/dropdown";
import { FeatherIcon } from "./_components/icons";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Posty",
  description: "Post your thoughts!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <nav className="sticky top-0 z-10 flex items-center justify-between bg-[#2e026d] p-4 shadow">
              <Link href="/" className="flex items-center">
                <FeatherIcon className="h-6 w-6 text-[hsl(280,100%,70%)]" />
              </Link>
              <div className="flex items-center font-bold text-white">
                {session && (
                  <div className="flex flex-row items-center gap-4 sm:gap-6">
                    <Link href="/">
                      <p className="text-xs text-white underline-offset-4 hover:text-[hsl(280,100%,70%)] hover:underline sm:text-lg">
                        Home
                      </p>
                    </Link>

                    <Link href="/dashboard">
                      <p className="text-xs text-white underline-offset-4 hover:text-[hsl(280,100%,70%)] hover:underline sm:text-lg">
                        Dashboard
                      </p>
                    </Link>
                    <Link href="/pricing">
                      <p className="text-xs text-white underline-offset-4 hover:text-[hsl(280,100%,70%)] hover:underline sm:text-lg">
                        Pricing
                      </p>
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="items-center p-2 hover:scale-110">
                          {session.user.image && (
                            <Image
                              src={session.user?.image ?? ""}
                              className="size-6 rounded-sm"
                              alt={session.user?.name ?? "Profile img"}
                              width={24}
                              height={24}
                            />
                          )}
                          <span className="sr-only">Toggle user menu</span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="mt-1 bg-white p-1"
                      >
                        <Link href={"/api/auth/signout"}>
                          <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-300">
                            <ArrowLeftEndOnRectangleIcon className="mr-1 size-6" />
                            Logout
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {!session && (
                  <Link
                    href={"/api/auth/signin"}
                    className="rounded-full bg-white/10 p-2 px-5 font-semibold no-underline transition hover:bg-white/20"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
            <main className="min-h-screen"> {children}</main>
            <footer className="py-2 text-center text-white">
              This is the footer. © {new Date().getFullYear()} My App. All
              rights reserved.
            </footer>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
