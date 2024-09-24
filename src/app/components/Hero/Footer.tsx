// import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Link } from "../../../../navigation";
import { getLocale } from "next-intl/server";
// import { getLocale } from 'next-intl/server';
export default async function Footer() {
  const locale = (await getLocale()).substring(0, 2); // This will give you "ar" or "en"
  const t= await getTranslations('Footer')
  return (
    <footer className="bg-black text-white py-8 h-[80vh] rounded-2xl border-t-4 border-gray-800 w-full mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="md:text-6xl text-4xl font-bold text-[#fbda5f]">{t('branding')}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">{t('shortCutLinks')}</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/addPlace"  locale={locale} className="hover:text-gray-400">{t('addPlace')}</Link>
              </li>
              <li>
                <Link href="/about" locale={locale} className="hover:text-gray-400">{t('about')}</Link>
              </li>
              <li>
                <Link href="/placesMap" locale={locale} className="hover:text-gray-400">{t('toMap')}</Link>
              </li>
              {/* <li>
                <Link href="/services" className="hover:text-gray-400">Services</Link>
              </li> */}
            </ul>
          </div>

          <div className="flex flex-col mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Developed by</h2>
            <div className="flex space-x-4">
            
              <Link href="https://www.instagram.com/_5lo_9/" target="_blank" className="bg-yellow-100 text-black p-3 rounded-full hover:text-gray-400">
                <i className="fab fa-instagram">Al-Mardas</i>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-8">
          <p>{t('rights')} &copy; {new Date().getFullYear()} {t('brand')} </p>
        </div>
      </div>
    </footer>
  );
}
