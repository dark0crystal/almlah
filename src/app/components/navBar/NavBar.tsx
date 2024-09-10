import Brand from "./Brand";
import LanguageChange from "./LanguageChange";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "navigation";


type NavBarProps = {
  style: string;
};

export default async function NavBar({ style }: NavBarProps) {
  const locale = (await getLocale()).substring(0, 2); // This will give you "ar" or "en"

  const t = await getTranslations("Links");
  const navLinks = [
    { direction: "/about", name: t("about") },
    { direction: "/placesMap", name: t("map") },
  ];

  return (
    <div dir={t("dir")}>
      <nav className={`${style} flex items-center justify-between p-2 lg:p-3 border border-gray-300 rounded-full w-[90vw] md:w-[70vw] lg:w-full `}>
        <div className="flex items-center">
          <Brand />
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((navLink, index) => (
            <Link key={index} locale={locale} href={navLink.direction}>
              <h1 className="text-xl mx-2 font-black">{navLink.name}</h1>
            </Link>
          ))}
          <NavMenu />
          <LanguageChange />
        </div>
        <MobileMenu navLinks={navLinks} />
      </nav>
    </div>
  );
}
