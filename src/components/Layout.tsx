import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChefHat, BookOpen, Menu, X } from 'lucide-react';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-stitch-surface text-stitch-text'
    }`}>
      {/* Header - 글래스모피즘 */}
      <header className={`sticky top-0 z-50 backdrop-blur-[20px] ${
        darkMode
          ? 'bg-zinc-900/80'
          : 'bg-stitch-surface/80'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className={`flex items-center gap-2 text-xl font-black font-serif transition-colors ${
              darkMode ? 'text-brand-400 hover:text-brand-300' : 'text-stitch-primary hover:text-stitch-primary-lit'
            }`}
          >
            <ChefHat size={28} />
            <span>오늘 뭐 먹지?</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
              <Link
                to="/"
                className={`transition-colors ${location.pathname === '/'
                  ? darkMode ? 'text-brand-400 font-bold' : 'text-stitch-primary font-bold'
                  : darkMode ? 'text-zinc-400 hover:text-brand-400' : 'text-stitch-text-muted hover:text-stitch-primary'}`}
              >
                추천받기
              </Link>
              <Link
                to="/directory"
                className={`transition-colors ${location.pathname === '/directory'
                  ? darkMode ? 'text-brand-400 font-bold' : 'text-stitch-primary font-bold'
                  : darkMode ? 'text-zinc-400 hover:text-brand-400' : 'text-stitch-text-muted hover:text-stitch-primary'}`}
              >
                전체 메뉴
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${location.pathname === '/about'
                  ? darkMode ? 'text-brand-400 font-bold' : 'text-stitch-primary font-bold'
                  : darkMode ? 'text-zinc-400 hover:text-brand-400' : 'text-stitch-text-muted hover:text-stitch-primary'}`}
              >
                소개
              </Link>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(d => !d)}
              className={`p-2.5 rounded-full transition-colors text-lg ${
                darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-stitch-surface-low hover:bg-stitch-surface-dim'
              }`}
              title="테마 전환"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-zinc-800' : 'hover:bg-stitch-surface-low'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className={`md:hidden px-4 py-2 flex flex-col gap-1 font-medium ${
            darkMode ? 'bg-zinc-900' : 'bg-stitch-surface-low'
          }`}>
            <Link to="/" className={`flex items-center gap-3 py-3 px-2 rounded-xl ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-stitch-surface'}`}>
              <ChefHat size={18} /> 추천받기
            </Link>
            <Link to="/directory" className={`flex items-center gap-3 py-3 px-2 rounded-xl ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-stitch-surface'}`}>
              <BookOpen size={18} /> 전체 메뉴
            </Link>
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={`mt-auto ${darkMode ? 'bg-zinc-900' : 'bg-stitch-surface-low'}`}>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className={`font-bold font-serif text-lg mb-1 ${darkMode ? '' : 'text-stitch-primary'}`}>오늘 뭐 먹지?</p>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-stitch-text-muted'}`}>당신의 식사 메뉴 고민을 덜어드립니다.</p>
            </div>
            <div className="flex gap-4 text-sm font-medium">
              <Link to="/about" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-brand-400' : 'text-stitch-text-muted hover:text-stitch-primary'}`}>서비스 소개</Link>
              <Link to="/privacy" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-brand-400' : 'text-stitch-text-muted hover:text-stitch-primary'}`}>개인정보처리방침</Link>
              <Link to="/terms" className={`transition-colors ${darkMode ? 'text-zinc-500 hover:text-brand-400' : 'text-stitch-text-muted hover:text-stitch-primary'}`}>이용약관</Link>
            </div>
          </div>
          <div className={`mt-8 pt-6 text-center text-sm ${darkMode ? 'text-zinc-500 border-t border-zinc-800' : 'text-stitch-text-muted border-t border-stitch-surface-dim'}`}>
            &copy; {new Date().getFullYear()} 오늘 뭐 먹지? All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
