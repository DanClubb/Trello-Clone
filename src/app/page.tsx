import { getServerAuthSession } from "~/server/auth";
import Boards from "./_components/Boards";
import DashboardNav from "./_components/DashboardNav";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) return <main className="text-center">Not logged in</main>
  return (
    <main className="flex justify-center gap-14 px-32 pt-11 grow">
      <DashboardNav />
      <Boards />
    </main>
  )
}
