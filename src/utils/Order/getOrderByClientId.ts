"use server"
export default async(userId:string,accessToken:string)=>{
    const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/orders/${userId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":accessToken
        },
    })
    if(!response.ok) return false;
    const data=await response.json();
    return data;
}   