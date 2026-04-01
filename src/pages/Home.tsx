import { useState, useRef } from 'react';
import { Menu, Category } from '../types';
import { menus } from '../data/menuData';
import { usePexelsImage } from '../hooks/usePexelsImage';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { photo, loading: photoLoading, error: photoError, fetchImage } = usePexelsImage();

  function getPool() {
    return selectedCategory ? menus.filter(m => m.category === selectedCategory) : menus;
  }

  function pickRandom(pool: Menu[], exclude?: Menu | null): Menu {
    const filtered = exclude && pool.length > 1 ? pool.filter(m => m.id !== exclude.id) : pool;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  function startSlot(finalMenu: Menu) {
    setSpinning(true);
    const pool = menus;
    let count = 0;
    const maxCount = 14;

    spinIntervalRef.current = setInterval(() => {
      setSpinText(pool[Math.floor(Math.random() * pool.length)].name);
      count++;
      if (count >= maxCount) {
        clearInterval(spinIntervalRef.current!);
        setSpinText(finalMenu.name);
        setSpinning(false);
        setCurrentMenu(finalMenu);
        fetchImage(finalMenu.keyword);
      }
    }, 80);
  }

  function handleRecommend() {
    if (spinning) return;
    const pool = getPool();
    const picked = pickRandom(pool, currentMenu);
    startSlot(picked);
  }

  return (
    <div className="w-full max-w-2xl px-4 py-8 mx-auto">
      <SEOHead 
        title="오늘 뭐 먹지? | 스마트 저녁 메뉴 추천" 
        description="매일 반복되는 식단 고민은 그만! 오늘 뭐 먹지 서비스가 당신의 취향과 분위기에 맞춘 최적의 저녁 메뉴를 추천해 드립니다. 한식, 중식, 일식, 양식, 분식, 야식까지 다양한 카테고리를 즐겨보세요."
      />

      <section className="mb-10 text-center">
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg mx-auto mb-2 text-sm sm:text-base">
          세상에서 가장 어려운 질문, <strong>"오늘 저녁 뭐 먹을까?"</strong><br />
          간단한 클릭 한 번으로 무작위 메뉴 추천부터 레시피 정보, 네이버 블로그 생생 후기까지 단번에 확인해 보세요. 엄선된 30여 개 이상의 식단 데이터베이스 기반 알고리즘이 여러분의 결정을 돕습니다.
        </p>
      </section>

      {/* 카테고리 필터 */}
      <div className="mb-6 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
        <h2 className="text-base font-bold mb-3 text-zinc-800 dark:text-zinc-100 ml-1">🥗 카테고리를 고르세요</h2>
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {/* 추천 버튼 */}
      <button
        onClick={handleRecommend}
        disabled={spinning}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-brand-500 to-red-500 text-white text-xl font-black shadow-lg
          hover:from-brand-400 hover:to-red-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-8"
      >
        {spinning ? '🎰 맛있는 메뉴 추첨 중...' : currentMenu ? '🔄 다른 메뉴 추천받기' : '🎲 오늘 뭐 먹지? 클릭!'}
      </button>

      {/* 결과 카드 */}
      <div className="min-h-[400px]">
        {(currentMenu || spinning) ? (
          <MenuCard
            menu={currentMenu ?? menus[0]}
            photo={photo}
            loading={photoLoading}
            error={photoError}
            spinning={spinning}
            spinText={spinText}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="text-6xl mb-6">🤔</p>
            <p className="text-lg font-bold text-zinc-700 dark:text-zinc-200 mb-2">무엇을 먹어야 할지 감이 안 오시나요?</p>
            <p className="text-sm text-center">위의 추천 버튼을 눌러보세요. <br />당신의 입맛을 돋울 맛있는 요리가 기다리고 있습니다.</p>
          </div>
        )}
      </div>

      <section className="mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-10">
        <h3 className="text-xl font-bold mb-4">다양한 메뉴를 한눈에 보고 싶다면?</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">랜덤 추천이 아니라 직접 메뉴 목록을 보며 고르고 싶으신가요? 전체 메뉴 디렉토리에서 수십 가지 메뉴와 레시피 정보를 한 곳에서 둘러보세요.</p>
        <Link to="/directory" className="inline-block px-6 py-3 bg-zinc-200 dark:bg-zinc-800 font-bold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
          전체 메뉴 구경하기 👉
        </Link>
      </section>
    </div>
  );
}
