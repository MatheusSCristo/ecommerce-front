type registerProps={
    name:string,
    lastName:string,
    email:string,
    password:string,
    cpf:string,
    birthDate:string
}


export default async (body:registerProps) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  return response;
  
  };
  