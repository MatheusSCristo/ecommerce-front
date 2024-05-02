export default async (userId:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data= await response.json();
    return data;
  
  };
  