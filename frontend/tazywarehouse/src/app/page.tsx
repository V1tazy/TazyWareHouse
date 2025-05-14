import { authConfig } from "@/config/AuthConfig";
import { getServerSession } from "next-auth";
import ActivitiesPage from "./(functional)/_activies/page";
import TaskPage from "./(functional)/_tasks/page";
import StatsPage from "./(functional)/_stats/page";

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Здравствуй, {session?.user?.email}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-6">
          <div className="w-full">
            <TaskPage />
          </div>
          
          <div className="w-full">
            <ActivitiesPage />
          </div>
        </div>
        

        <div className="lg:col-span-2">
          <div className="h-full min-h-[calc(100vh-200px)]">
            <StatsPage />
          </div>
        </div>
      </div>
    </div>
  );
}