import createNextIntlPlugin from 'next-intl/plugin';

// Create the plugin with the `createNextIntlPlugin` function
const withNextIntl = createNextIntlPlugin();

// Define the Next.js configuration
const nextConfig = {
<<<<<<< HEAD
 
=======
  // eslint:{
  //   ignoreDuringBuilds:true,
  // },
  // experimental: {
  //   fonts: true, // Enable experimental fonts support
  // },
>>>>>>> e741ec77eb1644bf126d8450c750d5e64dae0d32
  images: {
    domains: [process.env.DOMAINS, 'lh3.googleusercontent.com'],
  },
  // Add other configurations as needed
};

// Export the configuration with the `withNextIntl` plugin applied
export default withNextIntl(nextConfig);








