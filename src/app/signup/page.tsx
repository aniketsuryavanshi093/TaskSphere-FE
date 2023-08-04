import { getCurrentUser } from "@/lib/session";

export default async function Signup() {
  const user = await getCurrentUser()
  console.log("✔✔✔" , user);

  return <div>This is Signup</div>;
}
