import { getTranslations } from "next-intl/server";

type ShadyProps ={
    shady:number
    style:string
}

export default async function Shady({shady , style}:ShadyProps){
    const t = await getTranslations("Forms")
     // Map the numeric governorate value to its corresponding text
  const shadyMap: { [key: number]: string } = {
    1: t("shady"),
    2: t("notShady"),
  };

  
  const shadyText = shady
    ? shadyMap[shady]
    : "Unknown";
    return(
        <div className={`${style}`}>
            {shadyText}
        </div>
    )
}