type propsType={
    userEmail:string,
    userName:string
}

export default async({userName,userEmail}:propsType)=>{
    await fetch("http://localhost:8080/api/email",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({emailTo:userEmail,userName})
    })
  }