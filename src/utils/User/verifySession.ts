"use server"
import { cookies } from "next/headers";

export default async()=>{
    const accessToken=cookies().get("accessToken")
    if(!accessToken) return false;
    return true;
}