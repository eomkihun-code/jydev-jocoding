import SEOHead from '../components/SEOHead';
import { ChefHat, Database, Zap, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full max-w-3xl px-4 py-12 mx-auto">
      <SEOHead 
        title="서비스 소개" 
        description="오늘 뭐 먹지 서비스가 어떻게 만들어졌는지, 어떤 기술과 철학을 담고 있는지 소개합니다."
      />
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4"><span className="text-brand-500">오늘 뭐 먹지?</span> 서비스 소개</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          당신의 가장 큰 식사 고민을 해결하기 위해 만들어진 스마트한 웹 서비스입니다.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-500 rounded-2xl">
               <ChefHat size={24} />
             </div>
             <h2 className="text-2xl font-bold">왜 만들었을까요?</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            현대인들은 수많은 선택에 지쳐 있습니다. 그 중에서도 매일 세 번씩 마주하는 "식사 메뉴 결정"은 우리에게 
            소소하지만 큰 고민거리입니다. '오늘 뭐 먹지?' 서비스는 단 한 번의 버튼 클릭으로, 수십 가지의 검증된 
            레시피와 메뉴 중에서 최적의 요리를 추천해줌으로써 여러분의 결정 피로도를 확 낮추고자 개발되었습니다.
            단순히 음식 이름만 알려주는 것이 아니라, 집에서 어떻게 만들어 먹을 수 있는지 필수 재료와 조리 과정(레시피), 
            심지어 네이버 블로그의 생생한 후기까지 한 곳에 모아 제공합니다.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-2xl">
               <Database size={24} />
             </div>
             <h2 className="text-2xl font-bold">어떻게 동작하나요?</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            저희 서비스는 내부적으로 정교하게 분류된 풍부한 데이터 세트를 기반으로 합니다. 
            한식, 중식, 일식, 양식, 분식, 야식 등 각 카테고리별로 인기 있고 영양이 골고루 갖춰진 메뉴들을 선별하여 
            데이터베이스에 등재하였습니다. 카테고리 필터를 활용하여 기분에 맞는 카테고리 내에서 골라볼 수도 있고, 
            전체 풀에서 완전한 난수를 통해 랜덤하게 추천받을 수도 있습니다.
            또한 시각적 완성도를 높이기 위해 Pexels API를 활용하여 추천된 메뉴와 어울리는 고해상도 이미지를 제공합니다.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-2xl">
               <Zap size={24} />
             </div>
             <h2 className="text-2xl font-bold">기술 스택 (Tech Stack)</h2>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <strong className="min-w-24">Frontend:</strong> React (Vite 기반), TypeScript, TailwindCSS
              </li>
              <li className="flex items-start gap-2">
                <strong className="min-w-24">APIs:</strong> Naver Search API (블로그 검색 기능 서버리스 릴레이), Pexels API
              </li>
              <li className="flex items-start gap-2">
                <strong className="min-w-24">Hosting:</strong> Cloudflare Pages & Cloudflare Functions
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl">
               <Heart size={24} />
             </div>
             <h2 className="text-2xl font-bold">저작권 및 공지사항</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            본 서비스 내에서 제공되는 이미지는 Pexels에서 제공하는 무료 크리에이티브 커먼즈 저작물을 동적으로 불러옵니다.
            네이버 블로그 검색결과는 Naver Open API 정책을 준수하여 출력되며 클릭 시 원본 게시글로 이동합니다.
            자세한 내용은 사이트 하단의 약관 및 개인정보처리방침을 참고해 주세요. 건강하고 맛있는 저녁 되세요!
          </p>
        </section>
      </div>
    </div>
  );
}
