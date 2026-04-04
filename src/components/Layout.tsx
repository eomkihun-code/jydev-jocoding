import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navLink = (to: string, label: string) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`font-label text-base font-semibold transition-colors cursor-pointer ${
          active
            ? 'text-primary border-b-2 border-primary pb-1'
            : 'text-on-background hover:text-primary dark:text-zinc-200 dark:hover:text-primary'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-body ${darkMode ? 'dark bg-zinc-900 text-zinc-100' : 'bg-surface text-on-background'}`}>
      {/* Nav */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-red-100 shadow-sm dark:bg-zinc-900/90 dark:border-zinc-800">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-headline text-xl font-bold text-primary flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-primary">restaurant_menu</span>
              오늘 뭐 먹지?
            </Link>
            <div className="hidden md:flex gap-6">
              {navLink('/', '홈')}
              {navLink('/directory', '레시피 탐색')}
              {navLink('/about', '소개')}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors dark:hover:bg-zinc-800 text-lg"
              title="테마 전환"
              aria-label="다크모드 전환"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden cursor-pointer w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="메뉴 열기"
            >
              <span className="material-symbols-outlined text-xl text-primary">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-red-100 dark:border-zinc-800 px-6 py-5 flex flex-col gap-5">
            {navLink('/', '홈')}
            {navLink('/directory', '레시피 탐색')}
            {navLink('/about', '소개')}
          </div>
        )}
      </nav>

      {/* Main */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full mt-20 bg-red-50 border-t border-red-100 text-sm dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 py-12 gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-headline font-bold text-xl text-primary">오늘 뭐 먹지?</span>
            <p className="text-on-surface-variant dark:text-zinc-400 text-xs max-w-xs text-center md:text-left">
              © {new Date().getFullYear()} 오늘 뭐 먹지. 식약처 + TheMealDB 데이터 기반 저녁 메뉴 추천 서비스.
            </p>
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors font-medium cursor-pointer">소개</Link>
            <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors font-medium cursor-pointer">개인정보처리방침</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
