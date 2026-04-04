import { UnifiedRecipe } from '../types/recipe';
import { PexelsPhoto } from '../types';
import { toHttps } from '../hooks/useFoodRecipe';
import RecipeDetail from './RecipeDetail';
import MealDbDetail from './MealDbDetail';
import NaverBlogResults from './NaverBlogResults';
import ShareButtons from './ShareButtons';

interface Props {
  recipe: UnifiedRecipe;
  photo: PexelsPhoto | null;
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

export default function MenuCard({ recipe, photo, spinning, spinText }: Props) {
  const apiImg = recipe.source === 'korean'
    ? (toHttps(recipe.foodRecipe?.ATT_FILE_NO_MAIN ?? '') ?? toHttps(recipe.foodRecipe?.ATT_FILE_NO_MK ?? ''))
    : recipe.imageUrl || null;
  const displayImg = apiImg || photo?.src.large;
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
            className="w-full h-full object-cover animate-fade-in"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (photo?.src.large && t.src !== photo.src.large) t.src = photo.src.large;
              else t.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center text-7xl">🍽️</div>
        )}

        {/* 카테고리 뱃지 */}
        <div className="absolute top-5 left-5">
          <span
            className="px-3 py-1.5 text-xs font-bold rounded-full shadow-sm"
            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
          >
            {recipe.category}
          </span>
        </div>

        {/* Pexels 크레딧 */}
        {!apiImg && photo && (
          <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer"
            className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm hover:text-white transition-colors cursor-pointer">
            Photo by {photo.photographer} on Pexels
          </a>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-8 lg:p-10 space-y-6">
        <div>
          <h3 className="font-headline text-3xl md:text-4xl font-bold mb-2 text-on-background dark:text-zinc-100 leading-tight">
            {recipe.name}
          </h3>
          <p className="text-on-surface dark:text-zinc-300 font-medium text-base">
            오늘 저녁은 <span className="text-primary font-bold">{recipe.name}</span> 어때요?
          </p>
        </div>

        {/* 아코디언 섹션 */}
        <div className="space-y-3">
          {recipe.source === 'korean' && recipe.foodRecipe ? (
            <RecipeDetail recipe={recipe.foodRecipe} />
          ) : (
            <MealDbDetail recipe={recipe} />
          )}
          <NaverBlogResults menuName={recipe.name} />
          <ShareButtons menuName={recipe.name} category={recipe.category} />
        </div>
      </div>
    </div>
  );
}
