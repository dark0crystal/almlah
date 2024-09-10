import { getTranslations } from "next-intl/server";
type governorateProps ={
    governorate:number
    style:string
}

export default async function governorate({governorate , style}:governorateProps){
    const t = await getTranslations("Forms")
     // Map the numeric governorate value to its corresponding text
  const governorateMap: { [key: number]: string } = {
    1: t('muscat'),
    2: t('dhofar'),
    3: t('alBuraimi'),
    4: t('alDakhiliyah'),
    5: t('alBatinahNorth'),
    6: t('alBatinahSouth'),
    7: t('alSharqiyahNorth'),
    8: t('alSharqiyahSouth'),
    9: t('alWusta'),
    10: t('musandam'),
    11: t('alDhahirah'),
   
  };


  const governorateText = governorate
    ? governorateMap[governorate]
    : "Unknown";
    return(
        <div className={`${style}`}>
            {governorateText}
        </div>
    )
}