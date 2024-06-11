/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/places',
                destination: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            },
        ];
    },
};

