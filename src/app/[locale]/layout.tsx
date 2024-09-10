import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NextAuthProvider from '../../providers/NextAuthProvider';

// const phudu = Phudu({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });
const alexandriaFont = Alexandria({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: 'swap',
});

export const metadata: Metadata = {
    title: "almlah",
    description: "app that gathers the best spots in Oman",
};

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Pass locale as an object property
    const messages = await getMessages({ locale });

    // Determine text direction based on locale
    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    // Determine the font to use based on locale
    // const fontClassName = locale === 'ar' ? alexandriaFont.className : phudu.className;
    
    return (
        <html lang={locale} dir={direction}>
            <NextAuthProvider>
                <body className={alexandriaFont.className}>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <main>
                            {children}
                        </main>
                    </NextIntlClientProvider>
                </body>
            </NextAuthProvider>
        </html>
    );
}
