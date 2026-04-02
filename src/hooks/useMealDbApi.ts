import { useState, useEffect } from 'react';
import { UnifiedRecipe } from '../types/recipe';
import {
  FETCH_AREAS,
  MealDetail,
  normalizeListItem,
  normalizeMealDetail,
} from '../utils/normalizeMealDb';

const BASE = 'https://www.themealdb.com/api/json/v1/1';
const STORAGE_KEY = 'mealdb_lists_v1';
const DETAIL_PREFIX = 'mealdb_detail_';

// 모듈 레벨 캐시 (세션 내 재사용)
let listCache: UnifiedRecipe[] | null = null;
const detailCache = new Map<string, UnifiedRecipe>();

function loadFromStorage(): UnifiedRecipe[] | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UnifiedRecipe[]) : null;
  } catch {
    return null;
  }
}

function saveToStorage(recipes: UnifiedRecipe[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch {
    // 용량 초과 시 무시
  }
}

async function fetchAreaList(area: string): Promise<UnifiedRecipe[]> {
  const res = await fetch(`${BASE}/filter.php?a=${area}`);
  if (!res.ok) return [];
  const data = await res.json();
  const rows: Array<{ idMeal: string; strMeal: string; strMealThumb: string }> =
    data?.meals ?? [];
  return rows.map(item => normalizeListItem(item, area));
}

/** TheMealDB 레시피 목록 로드 (기본 정보만) */
export function useMealDbRecipes() {
  const [meals, setMeals] = useState<UnifiedRecipe[]>(listCache ?? []);
  const [loading, setLoading] = useState(listCache === null);

  useEffect(() => {
    if (listCache !== null) return;

    // sessionStorage 캐시 확인
    const cached = loadFromStorage();
    if (cached && cached.length > 0) {
      listCache = cached;
      setMeals(cached);
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const results = await Promise.all(FETCH_AREAS.map(fetchAreaList));
        const flat = results.flat();
        listCache = flat;
        saveToStorage(flat);
        setMeals(flat);
      } catch (e) {
        console.error('MealDB list load failed:', e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { meals, loading };
}

/** 특정 레시피의 상세 정보 lazy load */
export async function fetchMealDetail(idMeal: string): Promise<UnifiedRecipe | null> {
  const cacheKey = `mealdb_${idMeal}`;

  // 메모리 캐시
  if (detailCache.has(cacheKey)) return detailCache.get(cacheKey)!;

  // sessionStorage 캐시
  try {
    const raw = sessionStorage.getItem(DETAIL_PREFIX + idMeal);
    if (raw) {
      const recipe = JSON.parse(raw) as UnifiedRecipe;
      detailCache.set(cacheKey, recipe);
      return recipe;
    }
  } catch { /* ignore */ }

  // API fetch
  try {
    const res = await fetch(`${BASE}/lookup.php?i=${idMeal}`);
    if (!res.ok) return null;
    const data = await res.json();
    const meal: MealDetail = data?.meals?.[0];
    if (!meal) return null;
    const recipe = normalizeMealDetail(meal);
    detailCache.set(cacheKey, recipe);
    try {
      sessionStorage.setItem(DETAIL_PREFIX + idMeal, JSON.stringify(recipe));
    } catch { /* ignore */ }
    return recipe;
  } catch (e) {
    console.error('MealDB detail fetch failed:', e);
    return null;
  }
}
