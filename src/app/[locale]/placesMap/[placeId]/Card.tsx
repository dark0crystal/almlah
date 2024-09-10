import prisma from "src/lib/db";
import CardImages from "./CardImages";
import Governorate from "src/app/components/styledData/Governorate";
import PlaceType from "src/app/components/styledData/PlaceType";
import Camping from "src/app/components/styledData/Camping";
import Shady from "src/app/components/styledData/Shady";


type CardProps = {
    placeId: string; // Define the type for the props
  };
  
  export default async function Card({ placeId }: CardProps) {

    const placeDetails = await prisma.place.findUnique({
        where: {
          id:placeId as string,
        },
      });
      const placeStatus = await prisma.place_status.findUnique({
        where: {
          place_id:placeId as string,
        },
      });
    return (
      <div >
        
        <CardImages placeId={placeId}/>
        <div>
            <h1 className="text-xl ">{placeDetails?.name_ar}</h1>
            <Governorate style="text-xl text-gray" governorate={placeDetails?.governorate ?? 0}/>
            <PlaceType style="text-lg text-gray" placeType={placeDetails?.place_type ?? 0}/>
            <Camping style="text-lg text-gray" camping={placeStatus?.is_camping ?? 0}/>
            <Shady style="text-lg text-gray" shady={placeStatus?.is_shady_place ?? 0}/>
            <h1>{placeDetails?.description_ar}</h1>
            
            
        </div>
      </div>
    );
  }
  