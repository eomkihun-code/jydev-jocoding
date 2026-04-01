import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export default function SEOHead({
  title = '오늘 뭐 먹지? | 스마트 저녁 메뉴 추천',
  description = '단조로운 식단 고민은 그만! 빅데이터와 영양소를 고려한 스마트한 저녁 식사 메뉴를 무작위로 추천해 드립니다.',
  keywords = '저녁메뉴, 저녁메뉴추천, 오늘뭐먹지, 식사추천, 자취생요리, 저녁레시피, 랜덤메뉴',
  url = 'https://jydev-jocoding.pages.dev' // Replace with proper canonical if needed
}: SEOHeadProps) {
  const fullTitle = title !== '오늘 뭐 먹지? | 스마트 저녁 메뉴 추천' 
    ? `${title} - 오늘 뭐 먹지?`
    : title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
