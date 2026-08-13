/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/', destination: '/home-03/index.html' },
      { source: '/menu', destination: '/menu-02/index.html' },
      { source: '/about', destination: '/about/index.html' },
      { source: '/contact', destination: '/contact-02/index.html' },
    ];
  },
}

export default nextConfig;
