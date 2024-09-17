import prisma from "../../../../lib/db";
import CardImages from "./CardImages";
import Governorate from "../../../components/styledData/Governorate";
import PlaceType from "../../../components/styledData/PlaceType";
import Camping from "../../../components/styledData/Camping";
import Shady from "../../../components/styledData/Shady";
import { getLocale } from "next-intl/server";

type CardProps = {
  placeId: string; // Define the type for the props
};

export default async function Card({ placeId }: CardProps) {
  const locale = await getLocale()
  // Fetch place details
  const placeDetails = await prisma.place.findUnique({
    where: {
      id: placeId as string,
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
        <h1 className="font-normal">test test</h1>
        <div className="mt-2 flex flex-row items-center text-lg">
      {locale ==='ar'? (<h1>{placeDetails?.name_ar}</h1>):(<h1>{placeDetails?.name_en}</h1>)}  
      <span className="mx-1"> , </span>
          <Governorate
          style="text-lg text-gray-500 font-normal"
          governorate={placeDetails?.governorate ?? 0}
        />
      
        </div>
        <PlaceType
          style="text-lg text-gray-500 font-normal"
          placeType={placeDetails?.place_type ?? 0}
        />
        <Camping
          style="text-lg text-gray-500 font-light flex flex-row gap-2 items-center"
          camping={placeStatus?.is_camping ?? 0}
        />
        <Shady style="text-lg  text-gray-500 font-light" shady={placeStatus?.is_shady_place ?? 0} />
        {locale ==='ar'? (<h1>{placeDetails?.description_ar}</h1>):(<h1>{placeDetails?.description_en}</h1>)}

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
