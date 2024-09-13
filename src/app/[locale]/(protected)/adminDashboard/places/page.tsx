import React from 'react'
import { prisma } from '../../../../../lib/prisma';
import {Link} from '../../../../../../navigation';
import { getLocale } from 'next-intl/server';

const Page = async() => {
  const locale = (await getLocale()).substring(0,2)
  const places =await prisma.place.findMany(
    {where: 
      { is_checked:false},
      select:{
        id:true,
        name_ar:true,
        name_en:true ,

      }
    })
  console.log(places)

  return (
    <div>
      
        {places? ( places.map((place ,index )=>(
          <Link href={`/adminDashboard/places/${place.id}`} locale={locale} key={index} className='bg-gray-50 m-6 p-6'>
       
            {place.name_ar ? (<h1>{place.name_ar}</h1>):(<p>arabic name null</p>)}
          
            {place.name_en ? (<h1>{place.name_en}</h1>):(<p>english name null</p>)}
          
          </Link>
        ))):(
          <h1>no places</h1>
        )}
       
    </div>
  )
}

export default Page