// Import the `next-intl` plugin creator
import createNextIntlPlugin from 'next-intl/plugin';

// Create the plugin with the `createNextIntlPlugin` function
const withNextIntl = createNextIntlPlugin();

// Define the Next.js configuration
const nextConfig = {
  experimental: {
    fonts: true, // Enable experimental fonts support
  },
  images: {
    domains: [process.env.DOMAINS, 'lh3.googleusercontent.com'],
  },
  // Add other configurations as needed
};

// Export the configuration with the `withNextIntl` plugin applied
export default withNextIntl(nextConfig);







