/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'artiumacademy.mo.cloudinary.net', 'nationalguitaracademy.com', 'appliedguitartheory.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    // Explicitly expose NVIDIA API keys to the runtime
    NVIDIA_API_1: process.env.NVIDIA_API_1,
    NVIDIA_API_2: process.env.NVIDIA_API_2,
    NVIDIA_API_3: process.env.NVIDIA_API_3,
    NVIDIA_API_4: process.env.NVIDIA_API_4,
    NVIDIA_API_5: process.env.NVIDIA_API_5,
    NVIDIA_API_6: process.env.NVIDIA_API_6,
    NVIDIA_SMALL: process.env.NVIDIA_SMALL,
    NVIDIA_MEDIUM: process.env.NVIDIA_MEDIUM,
    NVIDIA_LARGE: process.env.NVIDIA_LARGE,
    NVIDIA_RERANK: process.env.NVIDIA_RERANK,
  },
  // Ensure environment variables are available in API routes
  experimental: {
    serverComponentsExternalPackages: ['axios']
  }
}

module.exports = nextConfig
