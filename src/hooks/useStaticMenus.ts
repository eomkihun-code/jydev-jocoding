import { useMemo } from 'react';
import { UnifiedRecipe } from '../types/recipe';
import { MENUS } from '../data/menus';
import menuImages from '../data/menuImages.json';

type ImageEntry = { url: string | null; thumb: string | null };
const images = menuImages as Record<string, ImageEntry>;

const TASTE_KEYWORDS: Record<string, string[]> = {
  '매콤한': ['매콤한', '매운'],
  '담백한': ['담백한'],
  '고소한': ['고소한'],
  '달콤한': ['달콤한'],
  '시원한': ['시원한'],
  '진한':   ['진한'],
  '건강한': ['건강한'],
  '간단한': ['간단한'],
};

function toUnified(item: typeof MENUS[number]): UnifiedRecipe {
  const img = images[item.id];
  return {
    id: `static_${item.id}`,
    name: item.name,
    category: item.category,
    imageUrl: img?.url ?? '',
    ingredientsText: '',
    steps: [],
    source: 'static',
    detailLoaded: true,
    tags: item.tags,
    time: item.time,
    difficulty: item.difficulty,
    isKidFriendly: item.isKidFriendly,
    kidSpicy: item.kidSpicy,
    hashTags: item.tags.join(' '),
  };
}

export function useStaticMenus() {
  const all = useMemo(() => MENUS.map(toUnified), []);

  function getFiltered(category: string | null): UnifiedRecipe[] {
    if (!category) return all;
    return all.filter(r => r.category === category);
  }

  function getFilteredByTaste(category: string | null, taste: string): UnifiedRecipe[] {
    const base = getFiltered(category);
    const keywords = TASTE_KEYWORDS[taste];
    if (!keywords) return base;
    const matched = base.filter(r => r.tags?.some(t => keywords.includes(t)));
    return matched.length > 0 ? matched : base;
  }

  function getFilteredByKid(category: string | null): UnifiedRecipe[] {
    return getFiltered(category).filter(r => r.isKidFriendly);
  }

  return { all, loading: false, error: null, getFiltered, getFilteredByTaste, getFilteredByKid };
}
