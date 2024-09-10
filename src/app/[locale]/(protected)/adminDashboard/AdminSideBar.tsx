import React from 'react'
import {Link} from '../../../../../navigation'
import { getLocale } from "next-intl/server";



const AdminSideBar = async() => {
  const locale = (await getLocale()).substring(0, 2); // This will give you "ar" or "en"

  return (
    <div>
        <div className='bg-violet-200 h-[30vh] text-5xl' >
            <Link className='m-4' locale={locale} href={"adminDashboard/places/"}>places</Link>
            <Link className='m-4' href={"adminDashboard/users/"}>users</Link>
            <Link className='m-4' href={"adminDashboard/reviews/"}>reviews</Link>
        </div>
    </div>
  )
}

export default AdminSideBar