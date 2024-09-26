import prisma from '../../../../lib/db'; // Adjust path to your Prisma instance
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const adminPlaceId = params.slug;

  // Validate the adminPlaceId
  if (!adminPlaceId || typeof adminPlaceId !== 'string') {
    return new Response('Invalid or missing adminPlaceId', { status: 400 });
  }

  try {
    // Fetch the place from the database
    const place = await prisma.place.findUnique({
      where: {
        id: adminPlaceId,
      },
    });

    // If no place is found, return a 404 response
    if (!place) {
      return new Response('Place not found', { status: 404 });
    }
    console.log("the place ", place.description_ar)
    console.log("the place ", place.is_checked)
    // Return the place as JSON
    return NextResponse.json({ place });
  } catch (error) {
    console.error('Error fetching place:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

  

  // try {
  //   const place = await prisma.place.findUnique({
  //     where: {
  //       id: adminPlaceId,
  //     },
  //   });

  //   if (!place) {
  //     return res.status(404).json({ error: 'Place not found' });
  //   }

  //   res.status(200).json(place);
  // } catch (error) {
  //   console.error('Error fetching place:', error);
  //   res.status(500).json({ error: 'Error fetching place' });
  // }

