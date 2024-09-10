// src/pages/api/places.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "src/utils/db";
import { auth } from 'auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.redirect(`/api/auth/signin?callbackUrl=${'/addReview'}`);
    }

    const body = await req.json();

    const createNewPlace = await prisma.place.create({
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
        governorate: body.governorate,
        place_type: body.place_type,
        rating: body.rating,
        note: body.note,
        author: { connect: { id: session.user.id } },
        favoritedBy: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(createNewPlace, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// export async function GET( ){

//         const session = await currentUser();

//         return NextResponse.json(session.email , {status:200})
    

// }

//  export async function POST(req : NextRequest){
//      const body  = (await req.json()) as createNewPlaceDto
//      const session =  useUserSession();
    
//      const newPlace =await prisma.place.create({
//         data:{
//              isChecked : body.isChecked, 
//              name  : body.name,
//             location  :body.location,
//              description :  body.description,
//              governorate :  body.governorate,
//              place_type: body.place_type,
//              rating :  body.rating,
//              note  : body.note,
//              author:{
//                  connect:{id:session.id}
//              } , 
//              favoritedBy:body.favoritedBy ? { connect: { id: session.id } } : undefined,
//          }
//      })
   
//  }