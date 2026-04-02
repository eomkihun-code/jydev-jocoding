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

  const API_KEY = context.env.FOOD_SAFETY_API_KEY;

  if (!API_KEY) {
    return new Response(JSON.stringify({ 
      error: 'API_KEY_MISSING', 
      detail: 'Cloudflare 환경변수(FOOD_SAFETY_API_KEY)를 찾을 수 없습니다. 대시보드 설정을 확인하세요.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  // http:// 주소 사용 (터미널 curl 테스트에서 성공했던 프로토콜)
  const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/${start}/${end}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
      // @ts-ignore: Cloudflare-specific cf option
      cf: {
        cacheTtl: 86400,
        cacheEverything: true,
      },
    });
    
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No detail');
      return new Response(JSON.stringify({ 
        error: 'EXTERNAL_API_ERROR', 
        status: res.status,
        detail: `식약처 API 응답 오류: ${res.statusText}`,
        body: errorText.slice(0, 500)
      }), {
        status: 502, // 406 등을 502로 통일하여 브라우저 처리 유도
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const text = await res.text();

    // 혹시 HTML 에러 페이지가 왔는데 status가 200인 경우 체크
    if (text.includes('<!DOCTYPE') || text.includes('<html')) {
       return new Response(JSON.stringify({ 
        error: 'API_RETURNED_HTML', 
        detail: 'API가 JSON 대신 HTML 에러 페이지를 반환했습니다.' 
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        ...CORS_HEADERS,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ 
      error: 'INTERNAL_SERVER_ERROR', 
      detail: String(e) 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }
};
