"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const SignInbtn = ({ user }: { user: string }) => {
  console.log(user,);
  const handleLogingoogle = async () => {
    try {
      const data = await signIn("google", {
        redirect: false
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div onClick={() => handleLogingoogle()}>SignInbtn</div>
  )
}

export default SignInbtn