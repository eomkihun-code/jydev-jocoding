import { useState, useRef } from 'react';
import { useUnifiedRecipes } from '../hooks/useUnifiedRecipes';
import { fetchMealDetail } from '../hooks/useMealDbApi';
import { usePexelsImage } from '../hooks/usePexelsImage';
import { UnifiedRecipe } from '../types/recipe';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 animate-pulse">
      <div className="w-full h-64 bg-zinc-700" />
      <div className="p-5 space-y-3">
        <div className="h-8 bg-zinc-700 rounded-lg w-1/2" />
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="h-4 bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function Home() {
  const { all, loading, error, categories, getFiltered, totalKorean, totalMealDb } = useUnifiedRecipes();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<UnifiedRecipe | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { photo, loading: photoLoading, fetchImage } = usePexelsImage();

  function pickRandom(pool: UnifiedRecipe[], exclude?: UnifiedRecipe | null): UnifiedRecipe {
    const filtered = exclude && pool.length > 1
      ? pool.filter(r => r.id !== exclude.id)
      : pool;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  async function startSlot(candidate: UnifiedRecipe) {
    setSpinning(true);
    let count = 0;
    const maxCount = 14;
    spinIntervalRef.current = setInterval(async () => {
      // 슬롯 중 랜덤 이름 표시
      if (all.length > 0) {
        setSpinText(all[Math.floor(Math.random() * all.length)].name);
      }
      count++;
      if (count >= maxCount) {
        clearInterval(spinIntervalRef.current!);

        // TheMealDB 레시피는 상세 정보 lazy load
        let final = candidate;
        if (candidate.source === 'mealdb' && !candidate.detailLoaded) {
          const idMeal = candidate.id.replace('mealdb_', '');
          const detail = await fetchMealDetail(idMeal);
          if (detail) final = detail;
        }

        setSpinText(final.name);
        setSpinning(false);
        setCurrentRecipe(final);
        fetchImage(final.name);
      }
    }, 80);
  }

  function handleRecommend() {
    if (spinning || loading) return;
    const pool = getFiltered(selectedCategory);
    if (pool.length === 0) return;
    startSlot(pickRandom(pool, currentRecipe));
  }

  const totalCount = totalKorean + totalMealDb;

  return (
    <div className="w-full max-w-2xl px-4 py-8 mx-auto">
      <SEOHead
        title="오늘 뭐 먹지? | 스마트 저녁 메뉴 추천"
        description="매일 반복되는 식단 고민은 그만! 오늘 뭐 먹지 서비스가 당신의 취향에 맞춘 최적의 저녁 메뉴를 추천해 드립니다."
      />

      <section className="mb-10 text-center">
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg mx-auto mb-2 text-sm sm:text-base">
          세상에서 가장 어려운 질문, <strong>"오늘 저녁 뭐 먹을까?"</strong><br />
          식약처 + 해외 레시피 DB 기반{' '}
          {loading ? '...' : <strong>{totalCount.toLocaleString()}개</strong>} 요리 중 오늘의 메뉴를 추천해드려요.
        </p>
      </section>

      {/* 카테고리 필터 */}
      <div className="mb-6 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
        <h2 className="text-base font-bold mb-3 text-zinc-800 dark:text-zinc-100 ml-1">🥗 카테고리를 고르세요</h2>
        {loading ? (
          <div className="flex gap-2 overflow-hidden">
            {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-16 bg-zinc-700 rounded-full animate-pulse flex-shrink-0" />)}
          </div>
        ) : (
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
            categories={categories}
          />
        )}
      </div>

      {/* 추천 버튼 */}
      <button
        onClick={handleRecommend}
        disabled={spinning || loading}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-brand-500 to-red-500 text-white text-xl font-black shadow-lg
          hover:from-brand-400 hover:to-red-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-8"
      >
        {loading
          ? '📦 레시피 불러오는 중...'
          : spinning
            ? '🎰 맛있는 메뉴 추첨 중...'
            : currentRecipe
              ? '🔄 다른 메뉴 추천받기'
              : '🎲 오늘 뭐 먹지? 클릭!'}
      </button>

      {/* 에러 */}
      {error && !loading && (
        <div className="text-center py-8 text-zinc-500 bg-zinc-800/50 rounded-2xl border border-dashed border-zinc-700 mb-6">
          <p className="text-3xl mb-2">⚠️</p>
          <p className="font-semibold text-zinc-300 mb-1">레시피 데이터를 불러오지 못했어요</p>
          <p className="text-sm">잠시 후 다시 시도해주세요.</p>
        </div>
      )}

      {/* 결과 카드 */}
      <div className="min-h-[400px]">
        {loading && !currentRecipe ? (
          <SkeletonCard />
        ) : (currentRecipe || spinning) ? (
          <MenuCard
            recipe={currentRecipe ?? all[0]}
            photo={photo}
            photoLoading={photoLoading}
            spinning={spinning}
            spinText={spinText}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="text-6xl mb-6">🤔</p>
            <p className="text-lg font-bold text-zinc-700 dark:text-zinc-200 mb-2">무엇을 먹어야 할지 감이 안 오시나요?</p>
            <p className="text-sm text-center">위의 추천 버튼을 눌러보세요.</p>
          </div>
        )}
      </div>

      <section className="mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-10">
        <h3 className="text-xl font-bold mb-4">다양한 메뉴를 한눈에 보고 싶다면?</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">랜덤 추천이 아니라 직접 메뉴 목록을 보며 고르고 싶으신가요?</p>
        <Link to="/directory" className="inline-block px-6 py-3 bg-zinc-200 dark:bg-zinc-800 font-bold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
          전체 메뉴 구경하기 👉
        </Link>
      </section>
    </div>
  );
}
