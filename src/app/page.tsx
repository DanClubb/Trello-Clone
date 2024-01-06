import Boards from "./_components/Boards";
import DashboardNav from "./_components/DashboardNav";

export default async function Home() {
  return (
    <main className="flex justify-center gap-14 px-32 pt-11 max-h-[calc(100vh-3rem)]">
      <DashboardNav />
      <Boards />
    </main>
  )
}
