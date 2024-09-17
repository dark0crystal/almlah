import {Link} from "../../../../navigation";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import NavBar from "src/app/components/navBar/NavBar";
import Gallaries from "./Gallaries";
export default async function About() {
    const locale = (await getLocale()).substring(0,2)
    const t = await getTranslations('about')
    return (
        <div className="flex items-center  flex-col relative">
            
            <Link href="/" locale={locale} className="absolute top-10 left-10 text-lg text-violet-500 hover:text-violet-700">
                Home
            </Link>
            <div className="flex flex-col justify-center   rounded-lg  p-6 leading-loose w-[90vw] md:w-[60vw] lg:w-[50vw]">
            <h1 className="text-xl font-bold" >{t("brand")}</h1>
            <div className="flex my-1 flex-col justify-center items-center text-center   ">
            <h1 className="text-xl">{t("us")}</h1>
            </div>
            </div>
            {/* <Gallaries/> */}
        </div>
    );
}
