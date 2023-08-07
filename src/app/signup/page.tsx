import { getCurrentUser } from "@/lib/session";
import UnAuthorizeLayout from "../_components/layouts/UnAuthorizeLayout";
import LoginForm from "../_components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default async function Signup() {
  const user = await getCurrentUser()
  // console.log(" signup pages . tsx", user);
  return <UnAuthorizeLayout>
    <>
      <div className="w-100 wrapper loginform flex-column">
        <div className="loginregister">
          <h2 className="logintitle">Register As Admin</h2>
          <p className="text-center">How to i get started lorem ipsum dolor at?</p>
          <LoginForm user={user} formtype="register" />
          <p className="text-muted mb-0 my-2 text-center"> <Link href="/login">  <span><i className="fa-solid fa-left-long"></i></span> back to login </Link></p>
        </div>
      </div>
      <div className="w-100 wrapper loginright">
        <div className=" p-3 position-relative subtitleloginWrapper">
          <p className="">Empower Your Projects, Conquer Tasks!</p>
          <Image alt="womenimage" className="womenimage" src='/images/womenlogin.png' height={400}
            width={400} />
          <Image alt="leftbrighticon" className="leftbrighticon" src='/images/Group11.png' height={79}
            width={79} />
        </div>
      </div>
    </>
  </UnAuthorizeLayout>
}
