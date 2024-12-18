/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const nextConfig = {
  webpack: (config, options) => {
    const {dev, isServer} = options

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    return config
  },
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'calm-buffalo-897.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
}

// eslint-disable-next-line no-undef
module.exports = nextConfig
