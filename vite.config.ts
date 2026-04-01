import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/food-recipe': {
          target: 'http://openapi.foodsafetykorea.go.kr',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              const url = new URL(req.url ?? '', 'http://localhost');
              const start = url.searchParams.get('start') ?? '1';
              const end = url.searchParams.get('end') ?? '100';
              proxyReq.path = `/api/${env.FOOD_SAFETY_API_KEY}/COOKRCP01/json/${start}/${end}`;
            });
          },
        },
        '/api/naver-search': {
          target: 'https://openapi.naver.com',
          changeOrigin: true,
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
