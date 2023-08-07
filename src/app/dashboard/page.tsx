import { getCurrentUser } from "@/lib/session";

export default async function Dashboard() {
  const user = await getCurrentUser();
  console.log(user, "from dashboard")
  return <div>This is dashboard</div>;
}
