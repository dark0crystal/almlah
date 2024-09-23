import { Link } from "navigation";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function NavBar() {
  const locale = await getLocale();
  const t= await getTranslations('about')

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[8vh] md:h-[10vh] flex items-center justify-between bg-white border-t w-screen border-black">
      <div className="flex w-full h-full">
        {/* Approach link */}
        <Link href="/about/approach" locale={locale} className="flex-1">
          <div className="flex items-center text-lg md:text-xl justify-center text-center border-r border-black h-full p-4 hover:bg-gray-100">
            {t('approach')}
          </div>
        </Link>

        {/* Policy link */}
        <Link href="/about/policy" locale={locale} className="flex-1">
          <div className="flex items-center text-lg md:text-xl justify-center text-center border-r border-l   border-black h-full p-4 hover:bg-gray-100">
            {t('policy')}
          </div>
        </Link>

        {/* About link */}
        <Link href="/about" locale={locale} className="flex-1">
          <div className="flex items-center text-lg md:text-xl  justify-center text-center h-full p-4 hover:bg-gray-100">
          {t('about')}
          </div>
        </Link>
      </div>
    </div>
  );
}
