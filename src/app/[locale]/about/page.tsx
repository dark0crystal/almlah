import Link from "next/link";
import { getTranslations } from "next-intl/server";
export default async function About() {
    const t = await getTranslations('about')
    return (
        <div className="h-[100vh] flex items-center justify-center flex-col relative">
            <Link href="/" className="absolute top-10 left-10 text-lg text-violet-500 hover:text-violet-700">
                Home
            </Link>
            <h1 className= " text-center md:text-9xl font-extrabold text-6xl text-violet-500">{t('soon')} 👨‍💻</h1>
        </div>
    );
}
