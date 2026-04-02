import { useState, useEffect } from 'react';
import { FoodRecipe, RecipeStep } from '../types/recipe';

// 메모리 캐시 (페이지 새로고침 전까지 유지)
let memCache: FoodRecipe[] | null = null;

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
  const [recipes, setRecipes] = useState<FoodRecipe[]>(memCache ?? []);
  const [loading, setLoading] = useState(memCache === null);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<string[]>(
    memCache ? extractCategories(memCache) : []
  );

  useEffect(() => {
    if (memCache !== null) return; // 이미 로드됨

    async function load() {
      try {
        const res = await fetch('/data/recipes.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json() as { total: number; recipes: FoodRecipe[] };
        const rows = data.recipes ?? [];
        if (rows.length === 0) throw new Error('No data');
        memCache = rows;
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
