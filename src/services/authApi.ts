import { NextResponse } from "next/server";

const APP_URL = process.env.NEXT_BASE_URL;


export async function registerUser(body:any)
{
    try {
     // client side fetching have browwser origin 
    const response = await fetch(`/api/server/auth/register`,{
        method:"POST",
        body:JSON.stringify(body)
    });
    if (!response.ok)
    {
        throw new Error("Registration failed");

    }
      return response.json();
        
    } catch (error) {
        
        console.log(error)
    }
   
}

export async function loginUser(body:any)
{
    try{
        const response = await fetch (`/api/server/auth/login`,{
            method:"POST",
            body:JSON.stringify(body)
        });
         const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const nextResponse = NextResponse.json({
      user: data.user,
    });

    nextResponse.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return nextResponse;

    }catch(error)
    {
       return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    }
}
//create enqiury 


