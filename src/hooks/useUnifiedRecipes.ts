import { useMemo } from 'react';
import { UnifiedRecipe, FoodRecipe } from '../types/recipe';
import { useFoodRecipe } from './useFoodRecipe';
import { useMealDbRecipes } from './useMealDbApi';

const TOP_CATEGORIES = ['한식', '중식', '일식', '양식', '분식'] as const;

// 분식집 핵심 메뉴 키워드
const BUNSIK_CORE = ['떡볶이', '순대', '어묵', '오뎅', '김밥', '쫄면', '라볶이', '호떡', '핫도그', '삼각김밥', '떡꼬치'];
// 조건부 키워드 (제외어 없으면 분식)
const BUNSIK_CONDITIONAL = ['라면', '우동'];
// 분식에서 제외할 패턴
const BUNSIK_EXCLUDE = ['월남쌈', '샐러드라면', '삼겹살라면', '숙주라면', '라면크로켓', '꼬치구이'];

function isBunsik(name: string): boolean {
  if (BUNSIK_CORE.some(kw => name.includes(kw))) return true;
  if (BUNSIK_EXCLUDE.some(ex => name.includes(ex))) return false;
  return BUNSIK_CONDITIONAL.some(kw => name.includes(kw));
}

function normalizeKorean(r: FoodRecipe): UnifiedRecipe {
  const category = isBunsik(r.RCP_NM) ? '분식' : '한식';
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
