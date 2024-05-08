"use server"
import { cookies } from "next/headers";

export default async()=>{
    const accessToken=cookies().get("accesToken")
    if(!accessToken) return false;
    return true;
}