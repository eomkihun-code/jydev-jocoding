import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/naver-search': {
          target: 'https://openapi.naver.com',
          changeOrigin: true,
          rewrite: () => '/v1/search/blog.json',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              const url = new URL(req.url ?? '', 'http://localhost');
              const params = url.searchParams.toString();
              proxyReq.path = `/v1/search/blog.json?${params}`;
              proxyReq.setHeader('X-Naver-Client-Id', env.NAVER_CLIENT_ID ?? '');
              proxyReq.setHeader('X-Naver-Client-Secret', env.NAVER_CLIENT_SECRET ?? '');
            });
          },
        },
      },
    },
  }
})
