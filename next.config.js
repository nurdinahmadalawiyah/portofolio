/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      {
        source: '/api/chatbot',
        destination: 'https://api.nurdinahmadalawiyah.web.id/api/chat',
      },
    ];
  },
}

module.exports = nextConfig
