/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com/v0/b/twitter-clone-3857e.appspot.com",
    ],
  },
};
