import { useEffect, useState } from "react";
const APP_URL = process.env.NEXT_BASE_URL;

export default  function  useFetch (url:string){
    const [loading , isLoading] = useState(false);
    const [error, isError]= useState("");
    const [data,setData]   = useState([]);


    useEffect(()=>{
        const fetchData = async()=>{
        try {

        isLoading(true);
        const response = await fetch(`${APP_URL}api/server/${url}`);
        if (!response.ok){
            throw new Error(" Failed TO Fetch")
        }
        const result = await response.json();
        setData(result);
        } catch (error:any) {
        isError(error.message)
        }finally{
        isLoading(false)
        }
        }

        fetchData()
    },[url])
    
    return {
    data,
    loading,
    error,
  };
   
}