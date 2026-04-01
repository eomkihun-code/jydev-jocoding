import { useState, useEffect, useRef } from 'react';
import { Menu, Category } from './types';
import { menus } from './data/menuData';
import { usePexelsImage } from './hooks/usePexelsImage';
import CategoryFilter from './components/CategoryFilter';
import MenuCard from './components/MenuCard';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { photo, loading: photoLoading, error: photoError, fetchImage } = usePexelsImage();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    <div className="min-h-screen bg-zinc-900 dark:bg-zinc-900 text-white transition-colors">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-white">🍽️ 오늘 뭐 먹지?</h1>
            <p className="text-sm text-zinc-400 mt-0.5">저녁 메뉴 추천기</p>
          </div>
          <button
            onClick={() => setDarkMode(d => !d)}
            className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-lg"
            aria-label="테마 전환"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-5">
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>

        {/* 추천 버튼 */}
        <button
          onClick={handleRecommend}
          disabled={spinning}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-red-500 text-white text-lg font-black shadow-lg
            hover:from-brand-400 hover:to-red-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-5"
        >
          {spinning ? '🎰 추첨 중...' : currentMenu ? '🔄 다른 메뉴' : '🎲 오늘 뭐 먹지?'}
        </button>

        {/* 결과 카드 */}
        {(currentMenu || spinning) && (
          <MenuCard
            menu={currentMenu ?? menus[0]}
            photo={photo}
            loading={photoLoading}
            error={photoError}
            spinning={spinning}
            spinText={spinText}
          />
        )}

        {/* 초기 상태 */}
        {!currentMenu && !spinning && (
          <div className="text-center py-16 text-zinc-600">
            <p className="text-5xl mb-4">🤔</p>
            <p className="text-base font-medium">버튼을 눌러 오늘 저녁 메뉴를 추천받아요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
