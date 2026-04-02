import { useState, useEffect } from 'react';
import { FoodRecipe, RecipeStep } from '../types/recipe';
import { getCache, setCache } from '../utils/cache';

const CACHE_KEY = 'recipes_all_v2';

/** http:// → https:// 변환 */
export function toHttps(url: string): string | null {
  if (!url || url.trim() === '') return null;
  return url.replace(/^http:\/\//i, 'https://');
}

/** MANUAL01~20 필드에서 유효한 스텝만 추출 */
export function extractSteps(recipe: FoodRecipe): RecipeStep[] {
  const steps: RecipeStep[] = [];
  for (let i = 1; i <= 20; i++) {
    const pad = String(i).padStart(2, '0');
    const text: string = recipe[`MANUAL${pad}`] ?? '';
    const imgUrl: string = recipe[`MANUAL_IMG${pad}`] ?? '';
    const cleaned = text.replace(/^[\d]+\.\s*/, '').trim();
    if (cleaned) {
      steps.push({ step: i, text: cleaned, imgUrl: toHttps(imgUrl) ?? '' });
    }
  }
  return steps;
}

function extractCategories(recipes: FoodRecipe[]): string[] {
  const set = new Set<string>();
  for (const r of recipes) {
    if (r.RCP_PAT2?.trim()) set.add(r.RCP_PAT2.trim());
  }
  return Array.from(set).sort();
}

export function useFoodRecipe() {
  const [recipes, setRecipes] = useState<FoodRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const cached = getCache<FoodRecipe[]>(CACHE_KEY);
    if (cached && cached.length > 0) {
      setRecipes(cached);
      setCategories(extractCategories(cached));
      setLoading(false);
      return;
    }

    async function load() {
      try {
        // 정적 JSON 파일에서 직접 로드 (API 호출 불필요)
        const res = await fetch('/data/recipes.json');
        if (!res.ok) throw new Error('Failed to load recipes');
        const data = await res.json() as { total: number; recipes: FoodRecipe[] };
        const rows = data.recipes ?? [];
        if (rows.length === 0) throw new Error('No data');
        setCache(CACHE_KEY, rows);
        setRecipes(rows);
        setCategories(extractCategories(rows));
      } catch (err) {
        console.error('Recipe load failed:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { recipes, loading, error, categories };
}
