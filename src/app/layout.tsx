import "~/styles/globals.css";

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

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
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <nav className="sticky top-0 flex items-center justify-between p-4 shadow backdrop-blur-sm">
              <Link href="/" className="flex items-center">
                <FeatherIcon className="h-6 w-6 text-[hsl(280,100%,70%)]" />
              </Link>
              <div className="flex items-center font-bold text-white">
                {session && (
                  <div className="flex flex-row items-center gap-4 sm:gap-6">
                    <Link href="/">
                      <p className="text-white underline-offset-4 hover:text-[hsl(280,100%,70%)] hover:underline">
                        Home
                      </p>
                    </Link>
                    <Link href="/dashboard">
                      <p className="text-white underline-offset-4 hover:text-[hsl(280,100%,70%)] hover:underline">
                        Dashboard
                      </p>
                    </Link>
                    <Link href="/pricing">
                      <p className="text-white underline-offset-4 hover:text-[hsl(280,100%,70%)] hover:underline">
                        Pricing
                      </p>
                    </Link>
                    <Link
                      href={"/api/auth/signout"}
                      className="ml-2 flex flex-row gap-3 rounded-full bg-white/10 p-2 px-3 font-semibold no-underline transition hover:bg-white/20"
                    >
                      <ArrowLeftEndOnRectangleIcon className="size-6" />
                      {session.user.image && (
                        <Image
                          src={session.user?.image ?? ""}
                          className="size-6 rounded-sm"
                          alt={session.user?.name ?? "Profile img"}
                          width={24}
                          height={24}
                        />
                      )}
                    </Link>
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
