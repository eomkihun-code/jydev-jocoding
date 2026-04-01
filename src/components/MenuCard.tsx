import { Menu, PexelsPhoto } from '../types';

interface Props {
  menu: Menu;
  photo: PexelsPhoto | null;
  loading: boolean;
  error: boolean;
  spinning: boolean;
  spinText: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  '한식': 'bg-red-500/20 text-red-300',
  '중식': 'bg-yellow-500/20 text-yellow-300',
  '일식': 'bg-green-500/20 text-green-300',
  '양식': 'bg-blue-500/20 text-blue-300',
  '분식': 'bg-purple-500/20 text-purple-300',
  '야식': 'bg-orange-500/20 text-orange-300',
};

export default function MenuCard({ menu, photo, loading, error, spinning, spinText }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-800 dark:bg-zinc-800 shadow-xl animate-slide-up">
      {/* 이미지 영역 */}
      <div className="relative w-full h-64 sm:h-80 bg-zinc-700 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && !error && photo && (
          <img
            src={photo.src.large}
            alt={menu.name}
            className="w-full h-full object-cover animate-fade-in"
          />
        )}

        {!loading && (error || !photo) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
            <span className="text-5xl mb-2">🍽️</span>
            <span className="text-sm">이미지를 불러올 수 없어요</span>
          </div>
        )}

        {/* Pexels 크레딧 */}
        {!loading && !error && photo && (
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 text-xs text-white/60 hover:text-white/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm transition-colors"
          >
            Photo by {photo.photographer} on Pexels
          </a>
        )}
      </div>

      {/* 메뉴 정보 */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-1">
          {/* 슬롯머신 텍스트 */}
          <h2 className={`text-3xl font-black text-white tracking-tight ${spinning ? 'animate-slot-spin' : ''}`}>
            {spinning ? spinText : menu.name}
          </h2>
          {!spinning && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLOR[menu.category]}`}>
              {menu.category}
            </span>
          )}
        </div>
        {!spinning && (
          <p className="text-zinc-400 text-sm">오늘 저녁은 <span className="text-brand-400 font-semibold">{menu.name}</span> 어때요?</p>
        )}
      </div>
    </div>
  );
}
