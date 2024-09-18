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
            
            <Link href="/" locale={locale} >
               <div className="absolute top-8 left-8 text-lg text-black border border-black hover:bg-black hover:text-[#fbda5f]  rounded-full p-2 ">
                        Home
               </div>
            </Link>
            <div className="flex flex-col justify-center h-[85vh] rounded-lg  p-6 leading-loose w-[90vw] md:w-[60vw] lg:w-[50vw]">
            <h1 className="text-xl font-bold" >{t("brand")}</h1>
            <div className="flex my-1 flex-col justify-center items-center text-center   ">
            <h1 className="text-xl">{t("us")}</h1>
            </div>
            </div>
            {/* <Gallaries/> */}
        </div>
    );
}
