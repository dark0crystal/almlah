
import { Link } from "../../../navigation"
import NavMenu from "../components/navBar/NavMenu";
import { getTranslations } from "next-intl/server";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/Hero/Footer";
import { getLocale } from "next-intl/server";
import HeroParagraph from "../components/Hero/HeroParagraph";
import OmanIcons from "../components/Hero/OmanIcons";
import Cards from "../components/Hero/Cards";
import PlacesCount from "../components/Hero/PlacesCount";
// import SignInBtn from '../components/SignInBtn'

export default async function Home() {


  const t = await getTranslations('HomePage');


return (
  <main>
    <div className="flex flex-col items-center p-4">
      <NavBar style="bg-white mt-4"/>
      <OmanIcons/>
      <div className="flex flex-col justify-center items-center font-extrabold mt-8 text-center">
       <HeroParagraph/>
        <p className="md:text-xl tracking-wide text-sm my-6 text-gray-600">{t('welcome')}</p>
      </div>

        <div>
        {/* <iframe width="650" height="450" src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=m/s&zoom=4&overlay=wind&product=ecmwf&level=surface&lat=29.776&lon=50.585&detailLat=22.19058396490109&detailLon=59.36007499694825&marker=true" frameBorder="0"></iframe> */}
        </div>
        <Link className="flex justify-center items-center bg-[#fbda5f] md:p-4 p-3 rounded-full w-auto gap-3 my-16"  href='/placesMap'><span className="md:text-5xl text-3xl">🗺️</span><h1 className="md:text-2xl md:font-bold text-lg font-bold">{t("goMap")}</h1></Link>
        <div>
        <PlacesCount/>
        </div>
        {/* <div>
          <Cards/>
        </div> */}
        
        <Footer/>
       
        
    </div>
  </main>
);
}

