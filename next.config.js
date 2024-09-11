const createNextIntlPlugin = require('next-intl/plugin');

// Create the plugin with the `createNextIntlPlugin` function
const withNextIntl = createNextIntlPlugin();

// Define the Next.js configuration
const nextConfig = {
  images: {
    domains: [process.env.DOMAINS, 'lh3.googleusercontent.com'],
  },
  // Add other configurations as needed
};

// Export the configuration with the `withNextIntl` plugin applied
module.exports = withNextIntl(nextConfig);









