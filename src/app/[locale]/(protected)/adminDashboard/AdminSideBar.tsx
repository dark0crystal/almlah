import React from 'react'
import {Link} from '../../../../../navigation'
import { getLocale } from "next-intl/server";
import Image from 'next/image';




const AdminSideBar = async() => {
  const locale = (await getLocale()).substring(0, 2); // This will give you "ar" or "en"

  return (
    <div className='flex flex-col justify-center items-center'>

        <div className='bg-violet-200 h-[10vh] w-screen flex flex-row  text-xl md:text-4xl justify-center items-center' >
         
            <Link className='m-4 text-red-900' locale={locale} href={"adminDashboard/places/"}>places</Link>
            <Link className='m-4' locale={locale} href={"adminDashboard/users/"}>users</Link>
            <Link className='m-4' locale={locale} href={"adminDashboard/reviews/"}>reviews</Link>
        </div>
        
    </div>
  )
}

export default AdminSideBar