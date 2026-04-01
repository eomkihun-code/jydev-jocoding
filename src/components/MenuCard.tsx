import { FoodRecipe } from '../types/recipe';
import { PexelsPhoto } from '../types';
import { toHttps } from '../hooks/useFoodRecipe';
import RecipeDetail from './RecipeDetail';
import NaverBlogResults from './NaverBlogResults';

interface Props {
  recipe: FoodRecipe;
  photo: PexelsPhoto | null;
  photoLoading: boolean;
  spinning: boolean;
  spinText: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  '반찬': 'bg-red-500/20 text-red-300',
  '국&찌개': 'bg-blue-500/20 text-blue-300',
  '밥': 'bg-yellow-500/20 text-yellow-300',
  '후식': 'bg-pink-500/20 text-pink-300',
  '일품': 'bg-green-500/20 text-green-300',
  '볶음': 'bg-orange-500/20 text-orange-300',
  '찜': 'bg-purple-500/20 text-purple-300',
  '구이': 'bg-amber-500/20 text-amber-300',
};

export default function MenuCard({ recipe, photo, photoLoading, spinning, spinText }: Props) {
  const apiImg = toHttps(recipe.ATT_FILE_NO_MAIN) ?? toHttps(recipe.ATT_FILE_NO_MK);
  const displayImg = apiImg || photo?.src.large;
  const catColor = CATEGORY_COLOR[recipe.RCP_PAT2] ?? 'bg-zinc-700/50 text-zinc-300';

  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-800 shadow-xl animate-slide-up border border-zinc-700/50">
      {/* 이미지 */}
      <div className="relative w-full h-64 sm:h-80 bg-zinc-900 overflow-hidden">
        {(photoLoading && !apiImg) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {displayImg && !spinning ? (
          <img
            src={displayImg}
            alt={recipe.RCP_NM}
            className="w-full h-full object-cover animate-fade-in"
            onError={(e) => {
              // API 이미지 실패 시 Pexels 이미지로 대체
              const target = e.target as HTMLImageElement;
              if (photo?.src.large && target.src !== photo.src.large) {
                target.src = photo.src.large;
              } else {
                target.style.display = 'none';
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
            <span className="text-5xl mb-2">🍽️</span>
            <span className="text-sm">{spinning ? '메뉴 고르는 중...' : '이미지 준비 중'}</span>
          </div>
        )}

        {/* 사진 출처 (Pexels 사용 시) */}
        {!apiImg && !photoLoading && photo && !spinning && (
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
          <h2 className={`text-3xl font-black text-white tracking-tight ${spinning ? 'animate-slot-spin' : ''}`}>
            {spinning ? spinText : recipe.RCP_NM}
          </h2>
          {!spinning && recipe.RCP_PAT2 && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${catColor}`}>
              {recipe.RCP_PAT2}
            </span>
          )}
        </div>

        {!spinning && (
          <>
            <p className="text-zinc-400 text-sm mb-1">
              오늘 저녁은 <span className="text-brand-400 font-semibold">{recipe.RCP_NM}</span> 어때요?
            </p>
            <RecipeDetail recipe={recipe} />
            <NaverBlogResults menuName={recipe.RCP_NM} />
          </>
        )}
      </div>
    </div>
  );
}
