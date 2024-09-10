import React from 'react'
// import { authOptions } from 'src/lib/auth';
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
// import {prisma} from '../../../../lib/prisma'
const page = () => {
  // const session = await getServerSession(authOptions);
  // if(!session){
  //   redirect("/")
  // }else if(session){
  //   const user= await prisma.user.findUnique({where:{
  //     email: session?.user?.email

  //   }})
  //   if(!user || user.role !=='ADMIN'){
  //     redirect('/')
  //   }
    
  // }
  return (
    <div>admin page</div>
  )
}

export default page