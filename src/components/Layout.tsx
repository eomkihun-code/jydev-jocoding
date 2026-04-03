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
        className={`font-headline text-lg transition-colors ${
          active
            ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
            : 'text-on-background hover:text-primary'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-body ${darkMode ? 'dark bg-zinc-900 text-zinc-100' : 'bg-surface text-on-background'}`}>
      {/* Nav */}
      <nav className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 dark:bg-zinc-900/80">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-headline text-2xl font-bold italic text-on-background dark:text-zinc-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">restaurant_menu</span>
              Dinner's Ready
            </Link>
            <div className="hidden md:flex gap-6">
              {navLink('/', 'Home')}
              {navLink('/directory', 'Discovery')}
              {navLink('/about', 'About')}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="cursor-pointer active:scale-95 transition-transform text-2xl"
              title="테마 전환"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span className="material-symbols-outlined text-2xl text-primary">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-surface dark:bg-zinc-900 border-t border-outline-variant/10 px-8 py-4 flex flex-col gap-4">
            {navLink('/', 'Home')}
            {navLink('/directory', 'Discovery')}
            {navLink('/about', 'About')}
          </div>
        )}
      </nav>

      {/* Main */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full mt-20 bg-surface-container-low border-t border-outline-variant/10 text-sm tracking-wide dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-headline font-bold text-2xl text-on-background italic dark:text-zinc-100">Dinner's Ready</span>
            <p className="text-outline max-w-xs text-center md:text-left">© {new Date().getFullYear()} Dinner's Ready. Crafted for the Curated Hearth.</p>
          </div>
          <div className="flex gap-8">
            <Link to="/about" className="text-outline hover:text-primary transition-colors">About</Link>
            <Link to="/privacy" className="text-outline hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="text-outline hover:text-primary transition-colors">Terms</Link>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">restaurant</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
