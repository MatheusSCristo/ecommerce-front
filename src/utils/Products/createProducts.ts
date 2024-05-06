"use server"
import { cookies } from 'next/headers';

export default async(data:any)=>{
    const accessToken=cookies().get("accessToken")
    const body={...data,sizes:data.sizes.split(","),colors:data.colors.split(",")}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "Authorization":`Bearer ${accessToken?.value}`
        },
        body:JSON.stringify(body)
    })
    if(!response.ok)
    throw response;
}