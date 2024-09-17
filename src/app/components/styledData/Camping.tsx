import { getTranslations } from "next-intl/server";
import { GiCampingTent } from "react-icons/gi";

type CampingProps ={
    camping:number
    style:string
}

export default async function Camping({camping , style}:CampingProps){
    const t = await getTranslations("Forms")
     // Map the numeric governorate value to its corresponding text
  const campingMap: { [key: number]: string } = {
    1: t("allowed"),
    2: t("notAllowed"),
    3: t("allowedButNotRecommended"),
  };

  
  const campingText = camping
    ? campingMap[camping]
    : "Unknown";
    return(
        <div className={`${style}`}>
     
            {campingText} <GiCampingTent />
        </div>
    )
}