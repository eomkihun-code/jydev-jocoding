import { UnifiedRecipe } from '../types/recipe';
import { PexelsPhoto } from '../types';
import { toHttps } from '../hooks/useFoodRecipe';
import RecipeDetail from './RecipeDetail';
import MealDbDetail from './MealDbDetail';
import NaverBlogResults from './NaverBlogResults';

interface Props {
  recipe: UnifiedRecipe;
  photo: PexelsPhoto | null;
  photoLoading: boolean;
  spinning: boolean;
  spinText: string;
}

const CAT_CHIP: Record<string, string> = {
  '한식': 'bg-amber-100 text-amber-800',
  '중식': 'bg-red-100 text-red-800',
  '일식': 'bg-indigo-100 text-indigo-800',
  '양식': 'bg-emerald-100 text-emerald-800',
  '분식': 'bg-orange-100 text-orange-800',
};

export default function MenuCard({ recipe, photo, spinning, spinText }: Props) {
  const apiImg = recipe.source === 'korean'
    ? (toHttps(recipe.foodRecipe?.ATT_FILE_NO_MAIN ?? '') ?? toHttps(recipe.foodRecipe?.ATT_FILE_NO_MK ?? ''))
    : recipe.imageUrl || null;

  const displayImg = apiImg || photo?.src.large;
  const catLabel = recipe.subCategory ?? recipe.category;
  const chipColor = CAT_CHIP[recipe.category] ?? 'bg-zinc-100 text-zinc-700';

  return (
    <div className="bg-stitch-surface-hi dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(46,47,45,0.1)] animate-slide-up">
      {/* 이미지 */}
      <div className="relative w-full h-72 sm:h-96 bg-gradient-to-br from-stitch-surface-low to-stitch-surface-dim overflow-hidden">
        {displayImg && !spinning ? (
          <img
            src={displayImg}
            alt={recipe.name}
            className="w-full h-full object-cover animate-fade-in"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (photo?.src.large && t.src !== photo.src.large) t.src = photo.src.large;
              else t.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-7xl">
            {spinning ? '' : '🍽️'}
          </div>
        )}

        {/* 어두운 그라디언트 오버레이 */}
        {!spinning && <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />}

        {/* 카테고리 칩 */}
        {!spinning && (
          <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${chipColor}`}>
            {catLabel}
          </span>
        )}

        {/* 스피닝 텍스트 */}
        {spinning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-serif text-3xl font-black text-stitch-primary animate-slot-spin text-center px-8">{spinText}</p>
          </div>
        )}

        {/* 사진 출처 */}
        {!apiImg && photo && !spinning && (
          <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer"
            className="absolute bottom-3 right-3 text-xs text-white/70 hover:text-white bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
            Photo by {photo.photographer} on Pexels
          </a>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-6 sm:p-8">
        {!spinning && (
          <>
            {/* 제목 */}
            <div className="mb-1">
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-stitch-text dark:text-zinc-100 leading-tight">
                {recipe.name}
              </h2>
              {recipe.nameEn && (
                <p className="text-stitch-text-muted dark:text-zinc-400 text-sm mt-1">{recipe.nameEn}</p>
              )}
            </div>

            {/* 메타 */}
            {recipe.cookingMethod && (
              <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-stitch-surface-low dark:bg-zinc-700 text-stitch-text-muted dark:text-zinc-400">
                🍳 {recipe.cookingMethod}
              </span>
            )}

            <p className="text-stitch-text-muted dark:text-zinc-400 text-sm mt-3 mb-5">
              오늘 저녁은 <span className="text-stitch-primary font-bold">{recipe.name}</span> 어때요?
            </p>

            {/* 레시피 상세 */}
            {recipe.source === 'korean' && recipe.foodRecipe ? (
              <RecipeDetail recipe={recipe.foodRecipe} />
            ) : (
              <MealDbDetail recipe={recipe} />
            )}

            <NaverBlogResults menuName={recipe.name} />
          </>
        )}
      </div>
    </div>
  );
}
