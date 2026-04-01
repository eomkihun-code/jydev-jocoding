interface Env {
  NAVER_CLIENT_ID: string;
  NAVER_CLIENT_SECRET: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const query = searchParams.get('query');
  const display = searchParams.get('display') ?? '5';
  const sort = searchParams.get('sort') ?? 'sim';

  if (!query) {
    return new Response(JSON.stringify({ error: 'query is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  const naverUrl = `https://openapi.naver.com/v1/search/blog.json?query=${query}&display=${display}&sort=${sort}`;

  const res = await fetch(naverUrl, {
    headers: {
      'X-Naver-Client-Id': context.env.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': context.env.NAVER_CLIENT_SECRET,
    },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
};
