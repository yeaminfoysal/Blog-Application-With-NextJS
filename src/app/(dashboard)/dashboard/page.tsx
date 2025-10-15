import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardHomePage = async () => {

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="text-3xl bold">Welcome to dashboard {session?.user?.name}</h1>
        <h1 className="mt-4 bold">{session?.user?.email}</h1>
      </div>
    </div>
  );
};

export default DashboardHomePage;
