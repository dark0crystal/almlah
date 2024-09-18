import prisma from "../../../../lib/db";
import CardImages from "./CardImages";
import Governorate from "../../../components/styledData/Governorate";
import PlaceType from "../../../components/styledData/PlaceType";
import Camping from "../../../components/styledData/Camping";
import Shady from "../../../components/styledData/Shady";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import PlaceServices from "../../../components/styledData/PlaceServices";
type CardProps = {
  placeId: string; // Define the type for the props
};

export default async function Card({ placeId }: CardProps) {
  const t= await getTranslations('Forms')
  const locale = await getLocale()
  // Fetch place details
  const placeDetails = await prisma.place.findUnique({
    where: {
      id: placeId as string,
    },
    include: {
            status: true,  // This includes the related place_status
          },

  });

  // Fetch place status (if needed)
  const placeStatus = await prisma.place_status.findUnique({
    where: {
      place_id: placeId as string,
    },
  });

  // Declare latitude and longitude variables outside the if block
  let latitude: number | null = null;
  let longitude: number | null = null;

  // Process the location coordinates if the place exists
  if (placeDetails && placeDetails.location) {
    [latitude, longitude] = placeDetails.location
      .split(',')
      .map((coord) => parseFloat(coord.trim()));

    console.log(`Geocode: [${latitude}, ${longitude}]`);
  } else {
    console.log('place details are null');
  }

  return (
    <div>
      <CardImages placeId={placeId}  />
      <div >
        <div className="mt-2 flex flex-row items-center text-lg">
      {locale ==='ar'? (<h1>{placeDetails?.name_ar}</h1>):(<h1>{placeDetails?.name_en}</h1>)}  
      <span className="mx-1"> , </span>
          <Governorate
          style="text-lg  font-normal"
          governorate={placeDetails?.governorate ?? 0}
        />
      
        </div>
        <PlaceType
          style="text-lg font-normal"
          placeType={placeDetails?.place_type ?? 0}
        />
        <Camping
          style="text-lg  font-light flex flex-row gap-2 items-center"
          camping={placeStatus?.is_camping ?? 0}
        />
        <Shady style="text-lg font-light" shady={placeStatus?.is_shady_place ?? 0} />
        <PlaceServices style="text-lg font-light" placeServices={placeStatus?.place_services ?? 0}/>
        <div className="my-2 bg-[#f7f7d5] p-4 border rounded-3xl">
            {locale ==='ar'? (<h1>{placeDetails?.description_ar}</h1>):(<h1>{placeDetails?.description_en}</h1>)}
        </div>
        <Link href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
          <div className="border border-black p-4 w-full rounded-full text-center mt-6 mb-6 cursor-pointer transition-all duration-300 hover:bg-black hover:text-yellow-200 hover:shadow-lg">
            {t('googleMap')}
          </div>
      </Link>


      </div>
      {latitude !== null && longitude !== null ? (
        <div className="iframe-container">
          <iframe
            className="iframe-map"
            src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=m/s&zoom=4&overlay=wind&product=ecmwf&level=surface&lat=${latitude}&lon=${longitude}&detailLat=${latitude}&detailLon=${longitude}&marker=true`}
            frameBorder="0"
          ></iframe>
        </div>
      ) : (
        <p>Location data is unavailable</p>
      )}
    </div>
  );
}
