type propsType={
    userEmail:string,
    userName:string
}

export default async({userName,userEmail}:propsType)=>{
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/email`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({emailTo:userEmail,userName})
    })
  }