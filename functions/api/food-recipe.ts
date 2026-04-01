interface Env {
  FOOD_SAFETY_API_KEY: string;
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
  const start = searchParams.get('start') ?? '1';
  const end = searchParams.get('end') ?? '100';

  if (!context.env.FOOD_SAFETY_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing FOOD_SAFETY_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  const url = `http://openapi.foodsafetykorea.go.kr/api/${context.env.FOOD_SAFETY_API_KEY}/COOKRCP01/json/${start}/${end}`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        ...CORS_HEADERS,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
};
