import { useState, useRef } from 'react';
import { useStaticMenus } from '../hooks/useStaticMenus';
import { UnifiedRecipe } from '../types/recipe';
import MenuCard from '../components/MenuCard';
import SEOHead from '../components/SEOHead';

const MOODS = [
  { label: '한식', icon: '🍲', color: '#b45309', bg: '#fef3c7', border: '#fcd34d' },
  { label: '중식', icon: '🥢', color: '#b91c1c', bg: '#fee2e2', border: '#fca5a5' },
  { label: '일식', icon: '🍱', color: '#1d4ed8', bg: '#eff6ff', border: '#93c5fd' },
  { label: '양식', icon: '🍝', color: '#15803d', bg: '#f0fdf4', border: '#86efac' },
  { label: '분식', icon: '🌭', color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd' },
];

// 세션 내 중복 방지: 최근 본 메뉴 ID 관리
const SESSION_KEY = 'jydev_recent_ids';
const HISTORY_LIMIT = 10;

function getRecentIds(): string[] {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '[]'); } catch { return []; }
}
function addRecentId(id: string) {
  const ids = getRecentIds();
  const next = [id, ...ids.filter(i => i !== id)].slice(0, HISTORY_LIMIT);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
}

export default function Home() {
  const { all, loading, error, getFiltered, getFilteredByTaste, getFilteredByKid } = useStaticMenus();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null);
  const [kidMode, setKidMode] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<UnifiedRecipe | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function pickRandom(pool: UnifiedRecipe[]) {
    const recentIds = getRecentIds();
    const fresh = pool.filter(r => !recentIds.includes(r.id));
    const candidates = fresh.length > 0 ? fresh : pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function startSlot(candidate: UnifiedRecipe) {
    setSpinning(true);
    setImgLoaded(false);
    let count = 0;
    spinRef.current = setInterval(() => {
      if (all.length > 0) setSpinText(all[Math.floor(Math.random() * all.length)].name);
      count++;
      if (count >= 14) {
        clearInterval(spinRef.current!);
        setSpinText(candidate.name);
        setSpinning(false);
        setCurrentRecipe(candidate);
        addRecentId(candidate.id);
      }
    }, 80);
  }

  function getPool(cat: string | null, taste: string | null, kid: boolean): UnifiedRecipe[] {
    if (kid) return getFilteredByKid(cat);
    if (taste) return getFilteredByTaste(cat, taste);
    return getFiltered(cat);
  }

  function recommend(cat: string | null, taste: string | null = selectedTaste, kid: boolean = kidMode) {
    if (spinning || loading) return;
    const pool = getPool(cat, taste, kid);
    if (pool.length === 0) return;
    startSlot(pickRandom(pool));
  }

  function handleMood(label: string) {
    const next = selectedCategory === label ? null : label;
    setSelectedCategory(next);
    setSelectedTaste(null);
    recommend(next, null);
  }

  function handleKidMode() {
    const next = !kidMode;
    setKidMode(next);
    setSelectedTaste(null);
    recommend(selectedCategory, null, next);
  }

  const heroImg = currentRecipe?.imageUrl || null;
  const totalCount = all.length.toLocaleString();

  return (
    <div className="w-full">
      <SEOHead
        title="오늘 뭐 먹지? | 저녁 메뉴 랜덤 추천"
        description="매일 고민되는 저녁 메뉴, 이제 한 번에 해결! 식약처 레시피 1,146개 + 해외 레시피를 바탕으로 한식·중식·일식·양식·분식 중 오늘의 메뉴를 추천해드립니다."
      />

      <main className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Hero ── */}
        <section className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 왼쪽 텍스트 */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="inline-block font-label text-xs font-bold tracking-widest text-primary uppercase bg-primary-container px-3 py-1 rounded-full">
                오늘을 위한 맞춤 추천
              </span>
              <h1 className="font-headline text-5xl md:text-6xl font-bold leading-tight text-on-background dark:text-zinc-100">
                오늘 저녁,<br/>
                <span className="text-primary">뭐 먹을까요?</span>
              </h1>
              <p className="text-base text-on-surface dark:text-zinc-300 font-medium leading-relaxed">
                {loading
                  ? '레시피 불러오는 중...'
                  : `식약처 + 해외 레시피 ${totalCount}개 중 오늘의 메뉴를 추천해드려요.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => recommend(selectedCategory)}
                disabled={spinning || loading}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl flex items-center gap-2 transition-all hover:bg-red-700 hover:shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <span className="material-symbols-outlined">
                  {spinning ? 'autorenew' : currentRecipe ? 'refresh' : 'restaurant'}
                </span>
                {loading ? '불러오는 중...' : spinning ? '추첨 중...' : currentRecipe ? '다른 메뉴 추천' : '오늘의 메뉴 추천받기'}
              </button>
              {currentRecipe && !spinning && (
                <button
                  onClick={() => { setCurrentRecipe(null); setSelectedCategory(null); }}
                  className="px-8 py-4 bg-white border-2 border-red-200 text-on-surface font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600"
                >
                  초기화
                </button>
              )}
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-surface-container shadow-2xl relative z-10">
              {spinning ? (
                <div className="w-full h-full flex items-center justify-center bg-red-50">
                  <p className="font-headline text-2xl font-bold text-primary animate-pulse text-center px-8">{spinText}</p>
                </div>
              ) : heroImg ? (
                <>
                  {!imgLoaded && (
                    <div className="absolute inset-0 bg-red-50 animate-pulse flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-red-200">restaurant</span>
                    </div>
                  )}
                  <img
                    src={heroImg}
                    alt={currentRecipe?.name}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgLoaded(true)}
                  />
                </>

              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-red-50 to-orange-50">
                  <span className="text-8xl">🍽️</span>
                  <p className="font-label text-on-surface-variant font-medium">버튼을 눌러 메뉴를 추천받으세요</p>
                </div>
              )}

              {currentRecipe && !spinning && (
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="bg-white inline-block px-4 py-2 rounded-xl shadow-md">
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-wider">오늘의 추천</span>
                    <span className="font-headline font-bold text-on-background text-lg">{currentRecipe.name}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-200/40 rounded-full blur-2xl -z-10" />
          </div>
        </section>

        {/* ── 기분 선택 ── */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-3xl font-bold text-on-background dark:text-zinc-100">어떤 음식이 당기나요?</h2>
              <p className="text-on-surface-variant dark:text-zinc-400 text-sm mt-1 font-medium">카테고리를 선택하면 해당 메뉴만 추천해드려요</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleKidMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all cursor-pointer ${
                  kidMode ? 'bg-yellow-400 border-yellow-400 text-white' : 'bg-white border-yellow-300 text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                🧒 어린이 OK
              </button>
              <button
                onClick={() => { setSelectedCategory(null); setKidMode(false); recommend(null, null, false); }}
                className="text-sm font-bold text-primary hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                전체 <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {MOODS.map(mood => {
              const active = selectedCategory === mood.label;
              return (
                <button
                  key={mood.label}
                  onClick={() => handleMood(mood.label)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all cursor-pointer active:scale-95 hover:shadow-md"
                  style={{
                    backgroundColor: active ? mood.bg : '#ffffff',
                    borderColor: active ? mood.border : '#fecaca',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = mood.bg; e.currentTarget.style.borderColor = mood.border; }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#fecaca'; } }}
                >
                  <span className="text-4xl mb-3">{mood.icon}</span>
                  <span className="font-bold text-base" style={{ color: mood.color }}>{mood.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 오늘의 추천 ── */}
        {(currentRecipe || spinning) && (
          <section className="py-12">
            <h2 className="font-headline text-3xl font-bold mb-8 text-on-background dark:text-zinc-100">
              {spinning ? '메뉴 선정 중...' : '오늘의 추천'}
            </h2>
            <MenuCard
              recipe={currentRecipe ?? all[0]}
              photo={null}
              photoLoading={false}
              spinning={spinning}
              spinText={spinText}
            />
          </section>
        )}

        {/* ── Error ── */}
        {error && (
          <p className="text-center text-red-600 font-medium py-8">
            레시피 데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        )}

        {/* ── FAQ ── */}
        <section className="py-12 max-w-3xl mx-auto w-full">
          <h2 className="font-headline text-3xl font-bold mb-8 text-on-background dark:text-zinc-100 text-center">자주 묻는 질문</h2>
          <div className="space-y-3">
            {[
              { q: '오늘 뭐 먹지 서비스는 무엇인가요?', a: '식약처 공식 레시피와 해외 레시피를 합쳐 총 수백 개의 메뉴 중 오늘의 저녁 메뉴를 랜덤으로 추천해주는 무료 서비스입니다.' },
              { q: '원하는 종류(한식, 중식 등)만 추천받을 수 있나요?', a: '네. 카테고리 버튼을 클릭하면 해당 카테고리 메뉴만 필터링해서 추천받을 수 있습니다.' },
              { q: '추천받은 메뉴의 레시피도 볼 수 있나요?', a: '네. 추천 결과 카드에서 "재료 보기"와 "레시피 보기"를 클릭하면 단계별 조리 방법을 확인할 수 있습니다.' },
              { q: '레시피 데이터는 어디서 가져오나요?', a: '한식은 식품의약품안전처(식약처) 공식 API에서, 중식·일식·양식은 TheMealDB 오픈 API에서 가져옵니다.' },
              { q: '매일 다른 메뉴를 추천받을 수 있나요?', a: '버튼을 클릭할 때마다 다른 메뉴를 랜덤으로 추천합니다. 같은 메뉴가 연속으로 나오지 않도록 설계되어 있습니다.' },
            ].map(({ q, a }, i) => (
              <details key={i} className="bg-white dark:bg-zinc-800 rounded-2xl border border-red-100 dark:border-zinc-700 group shadow-sm">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer list-none font-label font-semibold text-on-surface dark:text-zinc-100 text-base">
                  <span>Q. {q}</span>
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180 ml-4 flex-shrink-0">expand_more</span>
                </summary>
                <p className="px-6 pb-5 text-on-surface dark:text-zinc-300 text-sm leading-relaxed border-t border-red-50 dark:border-zinc-700 pt-4">A. {a}</p>
              </details>
            ))}
          </div>
        </section>


      </main>
    </div>
  );
}
