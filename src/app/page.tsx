import Boards from "./_components/Boards";
import DashboardNav from "./_components/DashboardNav";

export default async function Home() {
  return (
    <main className="flex justify-center gap-14 px-32 pt-11 grow">
      <DashboardNav />
      <Boards />
    </main>
  )
}
