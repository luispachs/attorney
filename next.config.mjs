/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: '/',
        destination: '/attorneys-panel',
        permanent: true,
      },
    ]
  }
}

export default nextConfig
