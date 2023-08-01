import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest , res: NextResponse){
      const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", "hello bro", {
            httpOnly: true, 
        })
        return response;
}
