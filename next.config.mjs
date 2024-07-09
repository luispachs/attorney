import withImages from 'next-images'

const nextConfig = withImages({
    reactStrictMode: false,
    images: {
        disableStaticImages: true
    },
})

export default nextConfig
