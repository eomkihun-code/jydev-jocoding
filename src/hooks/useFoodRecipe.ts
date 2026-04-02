import { useState, useEffect } from 'react';
import { FoodRecipe, FoodApiResponse, RecipeStep } from '../types/recipe';
import { getCache, setCache } from '../utils/cache';

const CACHE_KEY = 'recipes_all';
const TOTAL = 1000;

/** http:// → https:// 변환 + 빈 값 null 처리 */
export function toHttps(url: string): string | null {
  if (!url || url.trim() === '') return null;
  return url.replace(/^http:\/\//i, 'https://');
}

/** MANUAL01~20 필드에서 유효한 스텝만 추출 */
export function extractSteps(recipe: FoodRecipe): RecipeStep[] {
  const steps: RecipeStep[] = [];
  for (let i = 1; i <= 20; i++) {
    const pad = String(i).padStart(2, '0');
    const text: string = (recipe as Record<string, string>)[`MANUAL${pad}`] ?? '';
    const imgUrl: string = (recipe as Record<string, string>)[`MANUAL_IMG${pad}`] ?? '';
    const cleaned = text.replace(/^[\d]+\.\s*/, '').trim();
    if (cleaned) {
      steps.push({ step: i, text: cleaned, imgUrl: toHttps(imgUrl) ?? '' });
    }
  }
  return steps;
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
        const res = await fetch(`/api/food-recipe?start=1&end=${TOTAL}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error('API Error Response:', errorData);
          throw new Error(errorData.detail || 'API error');
        }
        const data = (await res.json()) as FoodApiResponse;
        const rows = data?.COOKRCP01?.row ?? [];
        if (rows.length === 0) throw new Error('No data');
        setCache(CACHE_KEY, rows);
        setRecipes(rows);
        setCategories(extractCategories(rows));
      } catch (err) {
        console.error('Recipe list fetch failed:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { recipes, loading, error, categories };
}

function extractCategories(recipes: FoodRecipe[]): string[] {
  const set = new Set<string>();
  for (const r of recipes) {
    if (r.RCP_PAT2?.trim()) set.add(r.RCP_PAT2.trim());
  }
  return Array.from(set).sort();
}
