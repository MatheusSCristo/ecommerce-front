"use server"
import productSchema from "@/schemas/productSchema";
import { cookies } from 'next/headers';
import { z } from "zod";

export default async(body:z.infer<typeof productSchema>)=>{
    const accessToken=cookies().get("accessToken")
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