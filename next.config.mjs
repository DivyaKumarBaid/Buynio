/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  redirects: () => [{
    source: "/",
    destination: "/home",
    permanent: true,
  }],
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules but @next module to managedPaths
      // Allows for hot refresh of changes to @next module
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@next)/],
    };
    return config;
  },
};

export default nextConfig;
