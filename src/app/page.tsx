import { getServerAuthSession } from "~/server/auth";
import Boards from "./_components/Boards";
import DashboardNav from "./_components/DashboardNav";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) return <main className="text-center">Sign In</main>
  return (
    <main className="flex flex-col justify-center gap-14 pt-11 px-4 grow lg:px-32 md:flex-row ">
      <DashboardNav />
      <Boards />
    </main>
  )
}
