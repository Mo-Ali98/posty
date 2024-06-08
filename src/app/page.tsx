import { getServerAuthSession } from "~/server/auth";
import GradualSpacing from "./_components/text-animation";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col justify-center gap-12 px-4">
        <GradualSpacing
          className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-black md:text-7xl md:leading-[5rem] dark:text-white"
          text={`Welcome, ${session?.user?.name}`}
        />
      </div>
    </main>
  );
}
