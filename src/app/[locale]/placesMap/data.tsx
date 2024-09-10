"use server"
import { supabase } from 'src/lib/supabase';
import { prisma } from 'src/lib/prisma';

let cachedPlacesData: { geocode: number[]; id: string; name: string | null; location: string; place_type: number; }[] | null = null;

export async function getPlacesData() {
  if (!cachedPlacesData) {
    console.log("Fetching places data from the database...");
    const places = await prisma.place.findMany({
      where: {
        is_checked: false
      },
      select: {
        location: true,
        id: true,
        name_ar: true,
        place_type: true,
      },
    });

    cachedPlacesData = places.map(place => {
      const [latitude, longitude] = place.location.split(',').map(coord => parseFloat(coord.trim()));

      console.log(`Geocode: [${latitude}, ${longitude}]`);
      return {
        geocode: [latitude, longitude],
        id: place.id,
        name: place.name_ar,
        location: place.location,
        place_type: place.place_type,
      };
    });
  }

  return cachedPlacesData;
}

export async function getPlacesImages() {
  const placeImages: { [key: string]: string } = {};

  const places = await prisma.place.findMany({
    select: {
      id: true,
    },
  });

  const imageFetchPromises = places.map(async (place) => {
    try {
      const { data: images, error } = await supabase.storage
        .from('almlahFiles')
        .list(`${place.id}/cover_image/`);

      if (error || images.length === 0) {
        console.error(`Error fetching images for place ${place.id}:`, error);
        return;
      }

      const imageUrl = supabase.storage
        .from('almlahFiles')
        .getPublicUrl(`${place.id}/cover_image/${images[0].name}`).data.publicUrl;

      placeImages[place.id] = imageUrl;
    } catch (error) {
      console.error(`Error processing place ${place.id}:`, error);
    }
  });

  await Promise.all(imageFetchPromises);

  return placeImages;
}



