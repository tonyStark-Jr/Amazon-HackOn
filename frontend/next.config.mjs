import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextVideo(nextConfig, {
  provider: 'vercel-blob',
  providerConfig: {
    'vercel-blob': {
      generateAssetKey(filePath, folder) {
        return filePath;
      },
    },
  },
  folder: 'videos',
});
