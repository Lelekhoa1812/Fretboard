/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'artiumacademy.mo.cloudinary.net', 'nationalguitaracademy.com', 'appliedguitartheory.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Ensure environment variables are available in API routes
  experimental: {
    serverComponentsExternalPackages: ['axios']
  }
}

module.exports = nextConfig
