import { getTranslations } from "next-intl/server";

type CampingProps ={
    placeServices:number
    style:string
}

export default async function Camping({placeServices , style}:CampingProps){
    const t = await getTranslations("Forms")
     // Map the numeric governorate value to its corresponding text
  const placeServicesMap: { [key: number]: string } = {
    1: t("nothing"),
    2: t("few"),
    3: t("alot"),
  };

  
  const placeServicesText = placeServices
    ? placeServicesMap[placeServices]
    : "Unknown";
    return(
        <div className={`${style}`}>
     
            {placeServicesText} 
        </div>
    )
}