import React from 'react'
import {Link} from '../../../../../navigation'
import { getLocale } from "next-intl/server";
import Image from 'next/image';
import img from '../../../../../public/AbnAlyahodya.jpeg'



const AdminSideBar = async() => {
  const locale = (await getLocale()).substring(0, 2); // This will give you "ar" or "en"

  return (
    <div className='flex flex-col justify-center items-center'>

        <div className='bg-violet-200 h-[10vh] w-screen flex flex-row  text-xl md:text-4xl justify-center items-center' >
         
            <Link className='m-4 text-red-900' locale={locale} href={"adminDashboard/places/"}>places</Link>
            <Link className='m-4' locale={locale} href={"adminDashboard/users/"}>users</Link>
            <Link className='m-4' locale={locale} href={"adminDashboard/reviews/"}>reviews</Link>
        </div>
        <Image width={200} height={100} src={img} alt='qsam'/>
    </div>
  )
}

export default AdminSideBar