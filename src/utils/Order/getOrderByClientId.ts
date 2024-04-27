"use server"
export default async(userId:string,accessToken:string)=>{
    const response=await fetch(`http://localhost:8080/api/orders/${userId}`,{
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