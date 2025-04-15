/** @type {import('next').NextConfig} */
const nextConfig = {
    // allowed hosts
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: '*.ufs.sh',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.optimization.minimize = false
        return config
    },
};

export default nextConfig;
