import { getTranslations } from "next-intl/server"


export default async function PlacesCount(){
    const t= await getTranslations('HomePage')
    const numOfPlaces= 30
    return(
        <div className="text-xl font-semibold border rounded-full p-4 border-slate-800">
            <h1>{`${t("numOfPlaces")} ${numOfPlaces}  ${t('contPlaces')}`} 🎉</h1>
        </div>
    )
}