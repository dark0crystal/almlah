import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        //عدله بارك الله فيك 
        domains: [process.env.DOMAINS,'lh3.googleusercontent.com'],
      },
};
 
export default withNextIntl(nextConfig);






