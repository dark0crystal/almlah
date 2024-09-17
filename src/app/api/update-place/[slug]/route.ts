import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/db'; // Adjust the path to your Prisma instance

export async function POST(req: NextRequest,  { params }: { params: { slug: string } }) {
  const adminPlaceId = params.slug;
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    // Parse the request body
    const { updatedFields } = await req.json();
    console.log(adminPlaceId)
    // Validate adminPlaceId
    if (!adminPlaceId || typeof adminPlaceId !== 'string') {
      return new NextResponse('Invalid place ID', { status: 400 });
    }

    // Validate updatedFields
    if (!updatedFields || typeof updatedFields !== 'object') {
      return new NextResponse('Invalid updated fields', { status: 400 });
    }

    // Update the place using Prisma
    const updatedPlace = await prisma.place.update({
      where: {
        id: adminPlaceId,
      },
      data: updatedFields,
    });

    // Return success response
    return NextResponse.json({ success: true, updatedPlace });
  } catch (error) {
    console.error('Error updating place:', error);
    return new NextResponse('Failed to update place', { status: 500 });
  }
}
