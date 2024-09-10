'use client'

import { useSession } from "next-auth/react";
import SignIn from "../SignIn";
import SignOut from "../SignOut";


   
export default function NavMenu(){
    const session =  useSession();
    return(
        <>
        {session?.status ==='authenticated' ? (<SignOut/>):(<SignIn/>)}
        

        </>     
       
    )
}
