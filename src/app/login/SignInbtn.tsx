"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const SignInbtn = ({user, session}: {user: string , session: any}) => {
    console.log(user,session);
    const handleLogingoogle = async()=>{
        try {
            const data = await signIn("google",{
              redirect:false
            });
            console.log(data);
                        
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div onClick={()=>handleLogingoogle()}>SignInbtn</div>
  )
}

export default SignInbtn