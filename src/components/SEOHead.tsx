import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://jydev-jocoding.pages.dev';
const SITE_NAME = '오늘 뭐 먹지?';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = '오늘 뭐 먹지? | 저녁 메뉴 추천',
  description = '식약처 + 해외 레시피 1,400개 기반 저녁 메뉴 추천 서비스. 한식·중식·일식·양식·분식 중 오늘의 메뉴를 랜덤 추천해드려요.',
  ogImage = DEFAULT_OG_IMAGE,
}: SEOHeadProps) {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;

  // JSON-LD 구조화 데이터 (WebSite + WebApplication)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description,
        inLanguage: 'ko-KR',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/directory?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/#webapp`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
        description,
        inLanguage: 'ko-KR',
      },
    ],
  };

  return (
    <Helmet>
      {/* 기본 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 구조화 데이터 */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
