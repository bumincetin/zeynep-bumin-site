/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/zeynep-bumin-site', // Replace with your repository name
  assetPrefix: '/zeynep-bumin-site/', // Replace with your repository name
}

module.exports = nextConfig 