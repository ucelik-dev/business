/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/businesses',
            permanent: true,
          },
        ]
    },
    eslint: {
      ignoreDuringBuilds: true,
  },

}

module.exports = nextConfig
