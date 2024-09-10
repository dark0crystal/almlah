import { getTranslations } from "next-intl/server";

type placeTypeProps ={
    placeType:number
    style:string
}

export default async function PlaceType({placeType , style}:placeTypeProps){
    const t = await getTranslations("Forms")
     // Map the numeric governorate value to its corresponding text
  const placeTypeMap: { [key: number]: string } = {
    1: t("beach"),
    2: t("mountain"),
    3: t("souq"),
    4: t("park"),
    5: t("museum"),
    6: t("castle"),
    7: t("fort"),
    8: t("wadi"),
    9: t("hike"),
    10: t("animalsPark"),
    11: t("factory"),
    12: t("cave"),
    13:t("festival"),
    14: t("hotSpring"),
    15: t("walkingTrack"),
    16: t("dam"),
    17: t("falaj"),
    18: t("mosque"),
    19: t("plantsPark"),
   
   
  };

  
  const placeTypeText = placeType
    ? placeTypeMap[placeType]
    : "Unknown";
    return(
        <div className={`${style}`}>
            {placeTypeText}
        </div>
    )
}