import Card from "./Card";
import { getTranslations } from "next-intl/server";

export default async function Place({ params }: { params: { placeId: string } }) {
  const t = await getTranslations('Links');

  return (

    <div  dir={t("dir")}>
      <Card placeId = {params.placeId}/>
    </div>
   
  );
}
