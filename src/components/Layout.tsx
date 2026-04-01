import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChefHat, Info, BookOpen, Menu } from 'lucide-react';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-black text-brand-500 hover:text-brand-600 transition-colors">
            <ChefHat size={28} />
            <span>오늘 뭐 먹지?</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 font-medium">
              <Link to="/" className="hover:text-brand-500 transition-colors">추천받기</Link>
              <Link to="/directory" className="hover:text-brand-500 transition-colors">전체 메뉴</Link>
              <Link to="/about" className="hover:text-brand-500 transition-colors">소개</Link>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-lg"
              title="테마 전환"
              aria-label="테마 전환"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Mobile Nav Toggle */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴 열기"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 flex flex-col gap-2 font-medium">
            <Link to="/" className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <ChefHat size={18} /> 추천받기
            </Link>
            <Link to="/directory" className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <BookOpen size={18} /> 전체 메뉴
            </Link>
            <Link to="/about" className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Info size={18} /> 소개
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg mb-1">오늘 뭐 먹지?</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">당신의 식사 메뉴 고민을 덜어드립니다.</p>
            </div>
            
            <div className="flex gap-4 text-sm font-medium">
              <Link to="/about" className="text-zinc-500 hover:text-brand-500 transition-colors">서비스 소개</Link>
              <Link to="/privacy" className="text-zinc-500 hover:text-brand-500 transition-colors">개인정보처리방침</Link>
              <Link to="/terms" className="text-zinc-500 hover:text-brand-500 transition-colors">이용약관</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} 오늘 뭐 먹지? All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
