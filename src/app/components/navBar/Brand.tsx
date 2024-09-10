import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Inter, Lalezar } from "next/font/google";

const lalezarFont = Lalezar({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
  });

export default async function Brand(){

    
    const t = await getTranslations("Links")
    return(
        <div className="mx-6 text-4xl ">
            <Link className={lalezarFont.className} href='/'>{t("brand")}</Link>
        </div>
    )
}