import { useMemo } from 'react';
import { UnifiedRecipe, FoodRecipe } from '../types/recipe';
import { useFoodRecipe } from './useFoodRecipe';
import { useMealDbRecipes } from './useMealDbApi';

const TOP_CATEGORIES = ['한식', '중식', '일식', '양식', '분식'] as const;

function normalizeKorean(r: FoodRecipe): UnifiedRecipe {
  const category = r.RCP_PAT2 === '분식' ? '분식' : '한식';
  return {
    id: `korean_${r.RCP_SEQ}`,
    name: r.RCP_NM,
    category,
    subCategory: r.RCP_PAT2,
    cookingMethod: r.RCP_WAY2,
    hashTags: r.HASH_TAG,
    imageUrl: r.ATT_FILE_NO_MAIN || r.ATT_FILE_NO_MK || '',
    ingredientsText: r.RCP_PARTS_DTLS ?? '',
    steps: [],           // RecipeDetail에서 직접 foodRecipe에서 추출
    nutrition: {
      cal: r.INFO_ENG, carb: r.INFO_CAR,
      pro: r.INFO_PRO, fat: r.INFO_FAT, na: r.INFO_NA,
    },
    naTip: r.RCP_NA_TIP,
    source: 'korean',
    detailLoaded: true,
    foodRecipe: r,
  };
}

export function useUnifiedRecipes() {
  const { recipes: korean, loading: kLoading, error } = useFoodRecipe();
  const { meals: mealdb, loading: mLoading } = useMealDbRecipes();

  const loading = kLoading || mLoading;

  const koreanUnified = useMemo(() => korean.map(normalizeKorean), [korean]);

  const all = useMemo(() => [...koreanUnified, ...mealdb], [koreanUnified, mealdb]);

  function getFiltered(category: string | null): UnifiedRecipe[] {
    if (!category) return all;
    return all.filter(r => r.category === category);
  }

  return {
    all,
    loading,
    error,
    categories: TOP_CATEGORIES as readonly string[],
    getFiltered,
    totalKorean: korean.length,
    totalMealDb: mealdb.length,
  };
}
