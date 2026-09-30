import { EnquiryData } from "@/types/form";

const APP_URL = process.env.NEXT_BASE_URL;

// server side fetching does not have origin 
//cache response for 5 min 

export async function  getAllSpa() {
    const response = await fetch(`${APP_URL}api/server/Spa`,{
        method:"GET",
        next:{
            revalidate: 300, // cached for 5 min 
        }
    });

    if (!response.ok)
    {
      throw new Error (" Failed To fetch the Spas")
    }
    
    return response.json();
}

//  get user  by id 
export async function getuserById (userid :string)
{
    try {
     const response = await fetch (`${APP_URL}/api/server/User/${userid}`,{
        method:"GET"
     });


     if (!response.ok)
     {
         throw new Error("Something Went Wrong")
     }

     return response.json()
        
    } catch (error) {
        return error
    }
}
