import { UnifiedRecipe } from '../types/recipe';
import NaverBlogResults from './NaverBlogResults';
import ShareButtons from './ShareButtons';

interface Props {
  recipe: UnifiedRecipe;
  photo: null;
  photoLoading: boolean;
  spinning: boolean;
  spinText: string;
}

const CAT_COLOR: Record<string, { text: string; bg: string }> = {
  '한식': { text: '#92400e', bg: '#fef3c7' },
  '중식': { text: '#991b1b', bg: '#fee2e2' },
  '일식': { text: '#1e40af', bg: '#eff6ff' },
  '양식': { text: '#166534', bg: '#f0fdf4' },
  '분식': { text: '#5b21b6', bg: '#f5f3ff' },
};

const DIFF_LABEL: Record<number, string> = { 1: '쉬움', 2: '보통', 3: '어려움' };
const DIFF_COLOR: Record<number, string> = {
  1: 'text-green-700 bg-green-50 border border-green-200',
  2: 'text-amber-700 bg-amber-50 border border-amber-200',
  3: 'text-red-700 bg-red-50 border border-red-200',
};

export default function MenuCard({ recipe, spinning, spinText }: Props) {
  const displayImg = recipe.imageUrl || null;
  const catStyle = CAT_COLOR[recipe.category] ?? { text: '#991b1b', bg: '#fee2e2' };

  if (spinning) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-red-100">
        <div className="aspect-video lg:aspect-[21/9] bg-red-50 flex items-center justify-center">
          <p className="font-headline text-3xl font-bold text-primary animate-pulse text-center px-8">{spinText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-red-100 animate-slide-up dark:bg-zinc-800 dark:border-zinc-700">
      {/* 이미지 */}
      <div className="relative aspect-video lg:aspect-[21/9]">
        {displayImg ? (
          <img
            src={displayImg}
            alt={recipe.name}
            className="w-full h-full object-contain animate-fade-in"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center text-7xl">🍽️</div>
        )}

        {/* 카테고리 뱃지 */}
        <div className="absolute top-5 left-5 flex gap-2">
          <span
            className="px-3 py-1.5 text-xs font-bold rounded-full shadow-sm"
            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
          >
            {recipe.category}
          </span>
          {recipe.isKidFriendly && (
            <span className="px-3 py-1.5 text-xs font-bold rounded-full shadow-sm bg-yellow-100 text-yellow-700">
              {recipe.kidSpicy ? '🌶️ 맵기 조절' : '🧒 어린이 OK'}
            </span>
          )}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="p-8 lg:p-10 space-y-6">
        <div>
          <h3 className="font-headline text-3xl md:text-4xl font-bold mb-3 text-on-background dark:text-zinc-100 leading-tight">
            {recipe.name}
          </h3>

          {/* 난이도 / 시간 뱃지 */}
          {(recipe.difficulty || recipe.time) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.difficulty && (
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${DIFF_COLOR[recipe.difficulty]}`}>
                  {DIFF_LABEL[recipe.difficulty]}
                </span>
              )}
              {recipe.time && (
                <span className="px-3 py-1 text-sm font-semibold rounded-full text-blue-700 bg-blue-50 border border-blue-200 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  약 {recipe.time}분
                </span>
              )}
            </div>
          )}

          <p className="text-on-surface dark:text-zinc-300 font-medium text-base">
            오늘 저녁은 <span className="text-primary font-bold">{recipe.name}</span> 어때요?
          </p>
        </div>

        {/* 아코디언 섹션 */}
        <div className="space-y-3">
          <NaverBlogResults menuName={recipe.name} />
          <ShareButtons menuName={recipe.name} category={recipe.category} />
        </div>
      </div>
    </div>
  );
}
