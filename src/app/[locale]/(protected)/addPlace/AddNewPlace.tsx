"use server";
import { prisma } from 'src/lib/prisma';
import { FromData } from './page';
import { authOptions } from 'src/lib/auth';
import { getServerSession } from 'next-auth';
import { supabase } from 'src/lib/supabase';
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export async function addNewPlace(data: FromData) {
  console.log("Inside addNewPlace function");

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('User not authenticated');
  }

  // Retrieve user from the database using session data
  const userIdDb = await prisma.user.findUnique({
    where: {
      email: session.user?.email ?? null,
      name: session.user?.name,
    },
  });

  if (!userIdDb?.id) {
    throw new Error('User not found');
  }

  // Get the locale and extract the language part
  const locale = (await getLocale()).substring(0, 2); // This will give you "ar" or "en"
  console.log("inside server", locale);

  // Declare the place variable
  let place;

  if (locale === 'ar') {
    // Create a new place entry if the locale is "ar"
    place = await prisma.place.create({
      data: {
        name_ar: data.name,
        location: data.location,
        description_ar: data.description,
        governorate: data.governorate ?? 0,
        place_type: data.place_type ?? 0,
        rating: parseInt(data.rating),
        note_ar: data.note,
        favorited_by_id: userIdDb.id,
        user_id: userIdDb.id,
      },
    });
  } else if (locale === 'en') {
    // Create a new place entry if the locale is "en"
    place = await prisma.place.create({
      data: {
        name_en: data.name,
        location: data.location,
        description_en: data.description, 
        governorate: data.governorate ?? 0,
        place_type: data.place_type ?? 0,
        rating: parseInt(data.rating),
        note_en: data.note, 
        favorited_by_id: userIdDb.id,
        user_id: userIdDb.id,
      },
    });
  }

  // Create a new place status entry
  await prisma.place_status.create({
    data: {
      place_id: place.id ,
      is_shady_place: data.isShadyPlace ?? 0,
      is_camping: data.isCamping ?? 0,
      place_services: data.place_services ?? 0,
      road: data.road ?? 0,
      perfect_time: "all",
    },
  });

  return { success: true, placeId: place.id, userId: userIdDb.id };
}





