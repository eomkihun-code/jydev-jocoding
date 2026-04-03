import { useState, useRef } from 'react';
import { useUnifiedRecipes } from '../hooks/useUnifiedRecipes';
import { fetchMealDetail } from '../hooks/useMealDbApi';
import { usePexelsImage } from '../hooks/usePexelsImage';
import { UnifiedRecipe } from '../types/recipe';
import MenuCard from '../components/MenuCard';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { toHttps } from '../hooks/useFoodRecipe';

const MOODS = [
  { label: '한식', emoji: '🍚', bg: 'from-amber-700 to-amber-500' },
  { label: '중식', emoji: '🥢', bg: 'from-red-700 to-red-400' },
  { label: '일식', emoji: '🍱', bg: 'from-indigo-700 to-indigo-400' },
  { label: '양식', emoji: '🍝', bg: 'from-emerald-700 to-emerald-400' },
  { label: '분식', emoji: '🌭', bg: 'from-orange-600 to-yellow-400' },
];

export default function Home() {
  const { all, loading, error, getFiltered, totalKorean, totalMealDb } = useUnifiedRecipes();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<UnifiedRecipe | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { photo, fetchImage } = usePexelsImage();

  function pickRandom(pool: UnifiedRecipe[], exclude?: UnifiedRecipe | null) {
    const filtered = exclude && pool.length > 1 ? pool.filter(r => r.id !== exclude.id) : pool;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  async function startSlot(candidate: UnifiedRecipe) {
    setSpinning(true);
    let count = 0;
    spinIntervalRef.current = setInterval(async () => {
      if (all.length > 0) setSpinText(all[Math.floor(Math.random() * all.length)].name);
      count++;
      if (count >= 14) {
        clearInterval(spinIntervalRef.current!);
        let final = candidate;
        if (candidate.source === 'mealdb' && !candidate.detailLoaded) {
          const detail = await fetchMealDetail(candidate.id.replace('mealdb_', ''));
          if (detail) final = detail;
        }
        setSpinText(final.name);
        setSpinning(false);
        setCurrentRecipe(final);
        fetchImage(final.name);
      }
    }, 80);
  }

  function handleRecommend(cat?: string | null) {
    if (spinning || loading) return;
    const useCat = cat !== undefined ? cat : selectedCategory;
    const pool = getFiltered(useCat);
    if (pool.length === 0) return;
    startSlot(pickRandom(pool, currentRecipe));
  }

  function handleMoodClick(label: string) {
    const next = selectedCategory === label ? null : label;
    setSelectedCategory(next);
    handleRecommend(next);
  }

  const heroImg = currentRecipe
    ? (currentRecipe.source === 'korean'
        ? (toHttps(currentRecipe.foodRecipe?.ATT_FILE_NO_MAIN ?? '') ?? toHttps(currentRecipe.foodRecipe?.ATT_FILE_NO_MK ?? ''))
        : currentRecipe.imageUrl)
      ?? photo?.src.large
    : null;

  return (
    <div className="w-full">
      <SEOHead
        title="오늘 뭐 먹지? | 스마트 저녁 메뉴 추천"
        description="식약처 + 해외 레시피 기반 저녁 메뉴 추천 서비스"
      />

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        {/* 텍스트 */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-stitch-primary mb-4">
            CURATED FOR YOU
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-black text-stitch-text dark:text-zinc-100 leading-[1.1] mb-5">
            오늘 당신의<br />저녁을<br />
            <span className="text-stitch-primary">책임집니다</span>
          </h1>
          <p className="text-stitch-text-muted dark:text-zinc-400 text-base mb-8 leading-relaxed">
            {loading ? '레시피 불러오는 중...' : `식약처 + 해외 레시피 ${(totalKorean + totalMealDb).toLocaleString()}개 중 오늘의 메뉴를 추천해드려요.`}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => handleRecommend()}
              disabled={spinning || loading}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-stitch-primary to-stitch-primary-lit text-white font-bold font-serif text-base shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? '불러오는 중...' : spinning ? '🎰 추첨 중...' : currentRecipe ? '🔄 다른 메뉴' : '추천받기'}
            </button>
            {currentRecipe && !spinning && (
              <button
                onClick={() => { setCurrentRecipe(null); setSelectedCategory(null); }}
                className="px-5 py-3.5 rounded-full bg-stitch-surface-low dark:bg-zinc-800 text-stitch-text dark:text-zinc-300 font-semibold text-base hover:bg-stitch-surface-dim transition-all"
              >
                초기화
              </button>
            )}
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative hidden md:block">
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-stitch-surface-low to-stitch-surface-dim shadow-[0_20px_60px_rgba(46,47,45,0.12)]">
            {spinning ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="font-serif text-3xl font-black text-stitch-primary animate-slot-spin text-center px-6">{spinText}</p>
              </div>
            ) : heroImg ? (
              <img src={heroImg} alt={currentRecipe?.name} className="w-full h-full object-cover animate-fade-in" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl">🍽️</div>
            )}
          </div>
          {/* 플로팅 배지 */}
          {currentRecipe && !spinning && (
            <div className="absolute -bottom-4 -left-4 bg-stitch-surface-hi shadow-[0_10px_30px_rgba(46,47,45,0.1)] rounded-2xl px-4 py-3 animate-slide-up">
              <p className="text-xs text-stitch-text-muted font-semibold uppercase tracking-wider mb-0.5">오늘의 추천</p>
              <p className="font-serif font-black text-stitch-text text-lg leading-tight">{currentRecipe.name}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 에러 ── */}
      {error && <p className="text-center text-red-500 py-4">⚠️ 레시피 데이터를 불러오지 못했어요.</p>}

      {/* ── Pick Your Mood ── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl font-black text-stitch-text dark:text-zinc-100">Pick Your Mood</h2>
          <button onClick={() => { setSelectedCategory(null); handleRecommend(null); }}
            className="text-sm text-stitch-primary font-semibold hover:underline">
            전체 보기 →
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {MOODS.map(mood => (
            <button
              key={mood.label}
              onClick={() => handleMoodClick(mood.label)}
              className={`relative aspect-square rounded-2xl overflow-hidden transition-all active:scale-95 shadow-[0_4px_16px_rgba(46,47,45,0.1)] ${
                selectedCategory === mood.label ? 'ring-4 ring-stitch-primary ring-offset-2' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mood.bg}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-white font-bold text-sm drop-shadow">{mood.label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── 추천 결과 카드 ── */}
      {(currentRecipe || spinning) && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <h2 className="font-serif text-2xl font-black text-stitch-text dark:text-zinc-100 mb-5">
            {spinning ? '🎰 메뉴 선정 중...' : "Chef's Pick"}
          </h2>
          <MenuCard
            recipe={currentRecipe ?? all[0]}
            photo={photo}
            photoLoading={false}
            spinning={spinning}
            spinText={spinText}
          />
        </section>
      )}

      {/* ── 전체 메뉴 링크 ── */}
      <section className="max-w-5xl mx-auto px-4 pb-20 text-center border-t border-stitch-surface-dim dark:border-zinc-800 pt-12">
        <h3 className="font-serif text-xl font-bold text-stitch-text dark:text-zinc-100 mb-3">다양한 메뉴를 한눈에 보고 싶다면?</h3>
        <p className="text-stitch-text-muted dark:text-zinc-400 mb-6 text-sm">직접 메뉴 목록을 보며 골라보세요.</p>
        <Link to="/directory"
          className="inline-block px-6 py-3 bg-stitch-surface-low dark:bg-zinc-800 font-bold rounded-full hover:bg-stitch-surface-dim dark:hover:bg-zinc-700 transition-colors text-stitch-text dark:text-zinc-200">
          전체 메뉴 구경하기 →
        </Link>
      </section>
    </div>
  );
}
