import SEOHead from '../components/SEOHead';

export default function Terms() {
  return (
    <div className="w-full max-w-3xl px-4 py-12 mx-auto">
      <SEOHead 
        title="이용약관" 
        description="오늘 뭐 먹지 서비스의 이용약관입니다."
      />
      
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black mb-4">이용약관 (Terms of Service)</h1>
        <p className="text-zinc-500 text-sm">최종 수정일: 2026년 4월 1일</p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 bg-white dark:bg-zinc-800/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-700">
        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">제 1 조 (목적)</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            본 약관은 "오늘 뭐 먹지?"(이하 "서비스")가 제공하는 모든 기능 및 웹페이지의 이용과 관련하여, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">제 2 조 (제공되는 서비스)</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            본 서비스는 무작위로 식사 메뉴를 추천하고, 해당 메뉴에 대한 조리법(레시피), 재료 목록 및 기타 연관 정보(Pexels 이미지, Naver 블로그 검색 등)를 무료로 제공합니다. 제공되는 레시피 및 관련 정보는 참고용으로만 제공되며, 모든 조리와 취식 행위에 따른 책임은 전적으로 이용자 본인에게 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">제 3 조 (저작권 및 외부 API 연동 안내)</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            본 서비스가 노출하는 이미지 검색 결과는 Pexels(https://www.pexels.com/) 의 무료 라이선스 이미지를 동적으로 호출하며, 블로그 검색 결과는 네이버 오픈 API(Naver Search API) 통신 결과를 그대로 보여줍니다. 해당 데이터의 소유권 및 저작권은 각각의 원저작자 또는 API 제공사에 있으며, 서비스는 이를 가공판매하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">제 4 조 (면책조항)</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            서비스는 무료로 제공되며 이용에 따른 특정한 결과(음식의 맛, 건강상 영향 등)를 보증하지 않습니다. 또한 외부 API 서비스 장애로 인해 일시적인 서비스 장애가 발생할 수 있으며 이에 대한 책임을 지지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
