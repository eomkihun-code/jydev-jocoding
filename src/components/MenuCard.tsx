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

const CAT_COLOR: Record<string, string> = {
  '한식': '#E67E22', '중식': '#E74C3C', '일식': '#3498DB', '양식': '#2ECC71', '분식': '#F1C40F',
};

export default function MenuCard({ recipe, photo, spinning, spinText }: Props) {
  const apiImg = recipe.source === 'korean'
    ? (toHttps(recipe.foodRecipe?.ATT_FILE_NO_MAIN ?? '') ?? toHttps(recipe.foodRecipe?.ATT_FILE_NO_MK ?? ''))
    : recipe.imageUrl || null;
  const displayImg = apiImg || photo?.src.large;
  const catLabel = recipe.subCategory ?? recipe.category;
  const catColor = CAT_COLOR[recipe.category] ?? '#F26B1D';

  if (spinning) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/10">
        <div className="aspect-video lg:aspect-[21/9] bg-surface-container-low flex items-center justify-center">
          <p className="font-headline text-3xl font-bold text-primary animate-pulse text-center px-8">{spinText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/10 animate-slide-up dark:bg-zinc-800 dark:border-zinc-700">
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
          <div className="w-full h-full bg-surface-container flex items-center justify-center text-7xl">🍽️</div>
        )}

        {/* 카테고리 뱃지 */}
        <div className="absolute top-6 left-6">
          <span
            className="px-3 py-1 text-white text-[10px] font-bold rounded-full"
            style={{ backgroundColor: catColor }}
          >
            {catLabel}
          </span>
        </div>

        {/* Pexels 크레딧 */}
        {!apiImg && photo && (
          <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer"
            className="absolute bottom-3 right-3 text-xs text-white/70 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm hover:text-white">
            Photo by {photo.photographer} on Pexels
          </a>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-8 lg:p-12 space-y-8">
        <div>
          <h3 className="font-headline text-4xl font-bold mb-2 text-on-background dark:text-zinc-100">{recipe.name}</h3>
          {recipe.nameEn && <p className="text-on-surface-variant text-sm mb-1">{recipe.nameEn}</p>}
          <p className="text-on-surface-variant">
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
        </div>
      </div>
    </div>
  );
}
