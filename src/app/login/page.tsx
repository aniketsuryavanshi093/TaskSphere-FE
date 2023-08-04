
import { getCurrentUser } from "@/lib/session";
import SignInbtn from "./SignInbtn";

export default async function Login() {
  const user = await getCurrentUser()
  console.log("page" , user);
  return <div>
      <SignInbtn user={user}/>
  </div>;
}
