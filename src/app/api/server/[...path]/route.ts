import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const API_URL = process.env.API_BASE_URL;

console.log("Handler Executed");

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
   const {path}= await params;
 // build backend URL
   const backendForFrontend = `${API_URL}/${path.join("/")}`;

   try {
    console.log("Calling .net api ...")
    console.log(backendForFrontend);
   const response = await fetch(backendForFrontend, {
      method: request.method,

      // set cookie in headerss
      headers: {
        "Content-Type": "application/json",
      },
      body:
        request.method === "GET" || request.method === "DELETE"
          ? undefined
          : await request.text(),
    });
    // console.log(".net api response", response);

   if (!response.ok)
   {
     throw new Error("Internal Server Error")
   }
    
   const data = await response.json();
  //  console.log("Response:", data);

   if (path[0] === "auth" && data.token) {
    const cookieStore = await cookies();
    console.log("Cookie generating"); 
      cookieStore.set("accessToken", data.token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "lax",
       path: "/",
   });
  //  console.log(cookieStore);
}


   if (!response.ok)
   {
      return NextResponse.json({message:"Error in requesting"},{status:500})
   }
   return NextResponse.json({
      message:"User Registered Succcesfully",
      data:data
   });
      
   } catch (error) {
      
       return NextResponse.json(
    {
      message:
        error instanceof Error ? error.message : "Something went wrong",
    },
    {
      status: 500,
    }
  );
   }
}

export { handler as GET };
export { handler as POST };
export { handler as PUT };
export { handler as DELETE };
export { handler as PATCH };