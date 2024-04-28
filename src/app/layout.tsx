import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Link from "next/link";
import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
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
                <span className="text-lg font-bold text-white">
                  <span className="text-[hsl(280,100%,70%)]">T3</span>
                </span>
              </Link>
              <div className="flex items-center font-bold text-white">
                {session && (
                  <div className="flex flex-row items-center gap-2">
                    <Link href="/">
                      <p className="mr-4 text-white hover:text-[hsl(280,100%,70%)]">
                        Home
                      </p>
                    </Link>
                    <Link href="/dashboard">
                      <p className="text-white hover:text-[hsl(280,100%,70%)]">
                        Dashboard
                      </p>
                    </Link>

                    <Link
                      href={"/api/auth/signout"}
                      className="ml-2 flex flex-row gap-3 rounded-full bg-white/10 p-2 px-3 font-semibold no-underline transition hover:bg-white/20"
                    >
                      <ArrowLeftEndOnRectangleIcon className="size-6" />
                      {session.user.image && (
                        <img
                          src={session.user.image}
                          className="size-6 rounded-sm"
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
            <footer className="sticky bottom-0 py-2 text-center text-white">
              This is the footer. © {new Date().getFullYear()} My App. All
              rights reserved.
            </footer>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
