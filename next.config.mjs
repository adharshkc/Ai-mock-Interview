/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React strict mode
    devIndicators: {
      buildActivity: false, // Hides build activity indicator in development mode
      autoPrerender: false, // Hides auto prerender indicator
    },
    productionBrowserSourceMaps: false, // Prevents source maps from being generated in production
    webpack(config) {
      // Suppresses warnings and non-critical errors during builds
      config.infrastructureLogging = {
        level: 'error', // Show only errors in the console
      };
  
      return config;
    },
  };
  
  export default nextConfig;
  
