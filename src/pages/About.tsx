import SEOHead from '../components/SEOHead';

export default function About() {
  return (
    <div className="w-full max-w-3xl px-4 py-12 mx-auto">
      <SEOHead
        title="서비스 소개 | 오늘 뭐 먹지?"
        description="식약처 레시피 1,146개 + 해외 레시피 기반 저녁 메뉴 추천 서비스. 한식·중식·일식·양식·분식을 무료로 추천해드립니다."
      />

      <div className="text-center mb-16">
        <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">About</p>
        <h1 className="font-headline text-4xl font-black mb-4 text-on-background dark:text-zinc-100">
          <span className="text-primary italic">오늘 뭐 먹지?</span> 서비스 소개
        </h1>
        <p className="text-on-surface-variant dark:text-zinc-400 text-base">
          매일 반복되는 저녁 메뉴 고민을 해결하기 위해 만들어진 무료 웹 서비스입니다.
        </p>
        <p className="text-xs text-on-surface-variant mt-2">최종 업데이트: 2026년 4월</p>
      </div>

      <div className="space-y-10">

        {/* 왜 만들었나 */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4 text-on-background dark:text-zinc-100">
            왜 만들었나요?
          </h2>
          <div className="bg-surface-container-lowest dark:bg-zinc-800 p-6 rounded-2xl shadow-[0_4px_16px_rgba(46,47,45,0.06)]">
            <p className="text-on-surface-variant dark:text-zinc-300 leading-relaxed">
              현대인은 하루에도 수십 가지 결정을 내려야 합니다. 그 중 "오늘 저녁 뭐 먹지?"는 매일 반복되는 고민입니다.
              이 서비스는 단 한 번의 클릭으로 한식·중식·일식·양식·분식 중 오늘의 메뉴를 추천하고,
              재료·레시피·블로그 후기까지 한 곳에 제공합니다.
            </p>
          </div>
        </section>

        {/* 데이터 출처 */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4 text-on-background dark:text-zinc-100">
            데이터 출처
          </h2>
          <div className="bg-surface-container-lowest dark:bg-zinc-800 p-6 rounded-2xl shadow-[0_4px_16px_rgba(46,47,45,0.06)] space-y-4">
            <div className="flex gap-4 items-start">
              <span className="text-2xl">🇰🇷</span>
              <div>
                <p className="font-bold text-on-surface dark:text-zinc-100">한식 · 분식</p>
                <p className="text-sm text-on-surface-variant dark:text-zinc-400">식품의약품안전처 공식 COOKRCP01 API — 1,146개 레시피. 재료, 조리법, 영양 정보 포함.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-2xl">🌏</span>
              <div>
                <p className="font-bold text-on-surface dark:text-zinc-100">중식 · 일식 · 양식</p>
                <p className="text-sm text-on-surface-variant dark:text-zinc-400">TheMealDB 오픈 API — 중국·일본·이탈리아·프랑스·미국·영국·스페인·그리스 요리 300여 개.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 기능 */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4 text-on-background dark:text-zinc-100">
            주요 기능
          </h2>
          <ul className="space-y-3">
            {[
              { emoji: '🎲', title: '랜덤 메뉴 추천', desc: '1,400여 개 레시피 중 랜덤으로 오늘의 저녁 메뉴 추천' },
              { emoji: '🗂️', title: '카테고리 필터', desc: '한식·중식·일식·양식·분식 중 원하는 종류만 선택 가능' },
              { emoji: '🛒', title: '재료 & 레시피', desc: '추천 메뉴의 재료 목록과 단계별 조리 방법 제공' },
              { emoji: '📝', title: '블로그 후기', desc: '네이버 블로그에서 해당 메뉴의 실제 후기 검색 연동' },
              { emoji: '▶', title: 'YouTube 영상', desc: '해외 레시피의 경우 YouTube 요리 영상 바로보기 제공' },
            ].map(({ emoji, title, desc }) => (
              <li key={title} className="flex gap-4 items-start bg-surface-container-lowest dark:bg-zinc-800 p-4 rounded-xl shadow-[0_2px_8px_rgba(46,47,45,0.05)]">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <p className="font-bold text-on-surface dark:text-zinc-100">{title}</p>
                  <p className="text-sm text-on-surface-variant dark:text-zinc-400">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 기술 스택 */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4 text-on-background dark:text-zinc-100">
            기술 스택
          </h2>
          <div className="bg-surface-container-lowest dark:bg-zinc-800 p-6 rounded-2xl shadow-[0_4px_16px_rgba(46,47,45,0.06)]">
            <ul className="space-y-2 text-sm text-on-surface-variant dark:text-zinc-300">
              <li><strong className="text-on-surface dark:text-zinc-100">Frontend:</strong> React 18 + Vite + TypeScript + Tailwind CSS</li>
              <li><strong className="text-on-surface dark:text-zinc-100">Hosting:</strong> Cloudflare Pages + Cloudflare Functions</li>
              <li><strong className="text-on-surface dark:text-zinc-100">APIs:</strong> 식약처 COOKRCP01, TheMealDB, Naver Blog Search, Pexels</li>
              <li><strong className="text-on-surface dark:text-zinc-100">Analytics:</strong> Google Analytics, Microsoft Clarity</li>
            </ul>
          </div>
        </section>

        {/* 저작권 */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4 text-on-background dark:text-zinc-100">
            저작권 및 공지
          </h2>
          <div className="bg-surface-container-lowest dark:bg-zinc-800 p-6 rounded-2xl shadow-[0_4px_16px_rgba(46,47,45,0.06)]">
            <p className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed">
              이미지는 Pexels 무료 라이선스 이미지를 사용합니다. 네이버 블로그 검색 결과는 Naver Open API 정책을 준수하며
              클릭 시 원본 게시글로 이동합니다. 자세한 내용은 하단의 개인정보처리방침 및 이용약관을 참고해 주세요.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
