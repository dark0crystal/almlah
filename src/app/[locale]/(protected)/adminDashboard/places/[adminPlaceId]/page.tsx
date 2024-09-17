import React from 'react';
import { prisma } from '../../../../../../lib/prisma';
import EditForm from './EditForm';

export async function FetchPlaceData(adminPlaceId: string | undefined) {
  if (!adminPlaceId) {
    return null;
  }

  // Fetch the place details from the database
  const place = await prisma.place.findUnique({
    where: {
      id: adminPlaceId,
    },
    include: {
      status: true,  // This includes the related place_status
    },
  });


  // Return null if no place is found
  return place || null;
}
export default async function PlaceDetailsAdmin( { params }: { params: { adminPlaceId: string } }) {

  return (
    
    <div> 
      
      <EditForm params={{adminPlaceId: params.adminPlaceId}} />
    </div>
  );
}



