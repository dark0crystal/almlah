import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";


export default async function HeroParagraph() {
  const locale = await getLocale();
  const t = await getTranslations('HomePage')


  return (
    <div className="text-center">
      <h1 className="md:text-6xl uppercase md:font-black md:leading-normal  text-2xl font-black leading-relaxed   ">{t('heroParagraph')}</h1>
    </div>
  );
}
