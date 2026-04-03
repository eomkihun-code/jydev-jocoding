import { writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fff8f4"/>
      <stop offset="100%" style="stop-color:#ffe8d6"/>
    </linearGradient>
    <linearGradient id="badge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#9d3e00"/>
      <stop offset="100%" style="stop-color:#F26B1D"/>
    </linearGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- 장식 원 (우측 상단) -->
  <circle cx="1050" cy="80" r="200" fill="#F26B1D" opacity="0.08"/>
  <circle cx="1100" cy="500" r="140" fill="#F26B1D" opacity="0.06"/>
  <!-- 장식 원 (좌측 하단) -->
  <circle cx="100" cy="550" r="160" fill="#F26B1D" opacity="0.07"/>

  <!-- 좌측 세로 강조선 -->
  <rect x="80" y="160" width="6" height="200" rx="3" fill="url(#badge)"/>

  <!-- 상단 레이블 -->
  <text x="110" y="210" font-family="Georgia, serif" font-size="24" font-weight="700"
    fill="#F26B1D" letter-spacing="4">CURATED FOR YOU</text>

  <!-- 메인 타이틀 -->
  <text x="108" y="310" font-family="Georgia, serif" font-size="88" font-weight="900"
    fill="#2e2f2d">오늘 뭐 먹지?</text>

  <!-- 서브 타이틀 (이탤릭 강조) -->
  <text x="110" y="385" font-family="Georgia, serif" font-size="44" font-weight="700"
    fill="#F26B1D" font-style="italic">저녁 메뉴 랜덤 추천</text>

  <!-- 설명 텍스트 -->
  <text x="110" y="450" font-family="Arial, sans-serif" font-size="26"
    fill="#5b5c5a">식약처 + 해외 레시피 1,400개 기반 · 한식 · 중식 · 일식 · 양식 · 분식</text>

  <!-- URL 배지 -->
  <rect x="108" y="490" width="420" height="52" rx="26" fill="url(#badge)"/>
  <text x="318" y="524" font-family="Arial, sans-serif" font-size="22" font-weight="700"
    fill="white" text-anchor="middle">jydev-jocoding.pages.dev</text>

  <!-- 우측 음식 이모지 장식 -->
  <text x="820" y="220" font-size="110" font-family="Arial">🍚</text>
  <text x="980" y="240" font-size="80" font-family="Arial">🥢</text>
  <text x="840" y="380" font-size="90" font-family="Arial">🍱</text>
  <text x="990" y="400" font-size="85" font-family="Arial">🍝</text>
  <text x="900" y="520" font-size="80" font-family="Arial">🌭</text>

  <!-- 하단 구분선 -->
  <rect x="0" y="610" width="1200" height="20" fill="url(#badge)"/>
</svg>`;

// SVG 저장
const svgPath = 'public/og-image.svg';
writeFileSync(svgPath, svg, 'utf-8');
console.log('SVG 생성 완료:', svgPath);

// sharp로 PNG 변환 시도
try {
  const { default: sharp } = await import('sharp');
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/og-image.png');
  console.log('PNG 변환 완료: public/og-image.png');
} catch (e) {
  console.log('sharp 없음, SVG만 사용합니다.');
  console.log('PNG 변환하려면: npm install sharp 후 다시 실행');
}
