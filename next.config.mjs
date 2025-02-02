/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/images/**',
            },{
            protocol: 'https',
            hostname: 'placehold.co',
            }
        ],
    },
};

export default nextConfig;
