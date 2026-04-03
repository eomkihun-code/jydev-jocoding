import { useState, useRef } from 'react';
import { useUnifiedRecipes } from '../hooks/useUnifiedRecipes';
import { fetchMealDetail } from '../hooks/useMealDbApi';
import { usePexelsImage } from '../hooks/usePexelsImage';
import { UnifiedRecipe } from '../types/recipe';
import MenuCard from '../components/MenuCard';
import SEOHead from '../components/SEOHead';
import { toHttps } from '../hooks/useFoodRecipe';

const MOODS = [
  { label: '한식', emoji: '🍲', color: '#E67E22' },
  { label: '중식', emoji: '🥢', color: '#E74C3C' },
  { label: '일식', emoji: '🍱', color: '#3498DB' },
  { label: '양식', emoji: '🍝', color: '#2ECC71' },
  { label: '분식', emoji: '🌭', color: '#F1C40F' },
];

const TASTE_CHIPS = ['매콤한', '담백한', '고소한', '달콤한', '시원한', '진한', '건강한', '간단한'];

export default function Home() {
  const { all, loading, error, getFiltered, totalKorean, totalMealDb } = useUnifiedRecipes();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<UnifiedRecipe | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { photo, fetchImage } = usePexelsImage();

  function pickRandom(pool: UnifiedRecipe[], exclude?: UnifiedRecipe | null) {
    const filtered = exclude && pool.length > 1 ? pool.filter(r => r.id !== exclude.id) : pool;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  async function startSlot(candidate: UnifiedRecipe) {
    setSpinning(true);
    let count = 0;
    spinRef.current = setInterval(async () => {
      if (all.length > 0) setSpinText(all[Math.floor(Math.random() * all.length)].name);
      count++;
      if (count >= 14) {
        clearInterval(spinRef.current!);
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

  function recommend(cat: string | null) {
    if (spinning || loading) return;
    const pool = getFiltered(cat);
    if (pool.length === 0) return;
    startSlot(pickRandom(pool, currentRecipe));
  }

  function handleMood(label: string) {
    const next = selectedCategory === label ? null : label;
    setSelectedCategory(next);
    recommend(next);
  }

  const heroImg = currentRecipe
    ? (currentRecipe.source === 'korean'
        ? (toHttps(currentRecipe.foodRecipe?.ATT_FILE_NO_MAIN ?? '') ?? toHttps(currentRecipe.foodRecipe?.ATT_FILE_NO_MK ?? ''))
        : currentRecipe.imageUrl)
      ?? photo?.src.large
    : null;

  const totalCount = (totalKorean + totalMealDb).toLocaleString();

  return (
    <div className="w-full">
      <SEOHead
        title="오늘 뭐 먹지? | 저녁 메뉴 랜덤 추천"
        description="매일 고민되는 저녁 메뉴, 이제 한 번에 해결! 식약처 레시피 1,146개 + 해외 레시피를 바탕으로 한식·중식·일식·양식·분식 중 오늘의 메뉴를 추천해드립니다."
      />

      <main className="max-w-7xl mx-auto px-8">

        {/* ── Hero ── */}
        <section className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 왼쪽 텍스트 */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-label text-sm font-bold tracking-widest text-primary uppercase">
                Curated For You
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight text-on-background dark:text-zinc-100">
                오늘 당신의 저녁을 <br/>
                <span className="text-primary italic">책임집니다</span>
              </h1>
              <p className="text-sm text-on-surface-variant font-medium">
                {loading ? '레시피 불러오는 중...' : `식약처 + 해외 레시피 ${totalCount}개 중 오늘의 메뉴를 추천해드려요.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => recommend(selectedCategory)}
                disabled={spinning || loading}
                className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">
                  {spinning ? 'autorenew' : currentRecipe ? 'refresh' : 'restaurant'}
                </span>
                {loading ? '불러오는 중...' : spinning ? '추첨 중...' : currentRecipe ? '다른 메뉴' : '추천받기'}
              </button>
              {currentRecipe && !spinning && (
                <button
                  onClick={() => { setCurrentRecipe(null); setSelectedCategory(null); }}
                  className="px-8 py-4 bg-surface-container text-on-surface font-semibold rounded-xl hover:bg-surface-container-high transition-colors"
                >
                  초기화
                </button>
              )}
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[1.4/1] rounded-2xl overflow-hidden bg-surface-container shadow-2xl relative z-10">
              {spinning ? (
                <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                  <p className="font-headline text-2xl font-bold text-primary animate-pulse text-center px-8">{spinText}</p>
                </div>
              ) : heroImg ? (
                <img src={heroImg} alt={currentRecipe?.name} className="w-full h-full object-cover animate-fade-in"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    if (photo?.src.large && t.src !== photo.src.large) t.src = photo.src.large;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">🍽️</div>
              )}

              {currentRecipe && !spinning && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="bg-white/95 backdrop-blur inline-block px-4 py-2 rounded-lg">
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-tighter">오늘의 추천</span>
                    <span className="font-headline font-bold text-on-background">{currentRecipe.name}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-0" />
          </div>
        </section>

        {/* ── Pick Your Mood ── */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl font-bold dark:text-zinc-100">Pick Your Mood</h2>
            <button
              onClick={() => { setSelectedCategory(null); recommend(null); }}
              className="text-sm font-bold text-on-surface-variant hover:text-primary flex items-center gap-1"
            >
              전체 보기 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {MOODS.map(mood => {
              const active = selectedCategory === mood.label;
              return (
                <button
                  key={mood.label}
                  onClick={() => handleMood(mood.label)}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all group active:scale-95"
                  style={{
                    backgroundColor: `${mood.color}1A`,
                    borderColor: active ? mood.color : 'transparent',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${mood.color}33`)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = `${mood.color}1A`)}
                >
                  <span className={`text-4xl mb-4 transition-all ${active ? '' : 'grayscale group-hover:grayscale-0'}`}>
                    {mood.emoji}
                  </span>
                  <span className="font-bold text-on-surface dark:text-zinc-200">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Chef's Pick ── */}
        {(currentRecipe || spinning) && (
          <section className="py-12">
            <h2 className="font-headline text-3xl font-bold mb-8 dark:text-zinc-100">
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

        {/* ── Error ── */}
        {error && <p className="text-center text-red-500 py-8">⚠️ 레시피 데이터를 불러오지 못했어요.</p>}

        {/* ── Taste Chips ── */}
        <section className="py-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <h4 className="font-headline text-3xl font-bold mb-10 dark:text-zinc-100">What are you craving?</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {TASTE_CHIPS.map(chip => (
              <span
                key={chip}
                onClick={() => recommend(selectedCategory)}
                className="px-6 py-2 bg-primary-container text-on-primary-container rounded-full font-semibold cursor-pointer hover:bg-primary hover:text-white transition-all"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
