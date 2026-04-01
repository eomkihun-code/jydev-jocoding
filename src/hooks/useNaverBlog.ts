import { useState, useCallback } from 'react';
import { NaverBlogItem } from '../types';

const CACHE_PREFIX = 'naver_blog_';

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

function getCached(key: string): NaverBlogItem[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    return raw ? (JSON.parse(raw) as NaverBlogItem[]) : null;
  } catch {
    return null;
  }
}

function setCache(key: string, items: NaverBlogItem[]) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useNaverBlog() {
  const [items, setItems] = useState<NaverBlogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = useCallback(async (menuName: string) => {
    setLoading(true);
    setError(false);
    setItems([]);

    const cached = getCached(menuName);
    if (cached) {
      setItems(cached);
      setLoading(false);
      return;
    }

    try {
      const query = encodeURIComponent(`${menuName} 레시피`);
      const res = await fetch(`/api/naver-search?query=${query}&display=5&sort=sim`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json() as { items: NaverBlogItem[] };
      const cleaned = data.items.map(item => ({
        ...item,
        title: stripTags(item.title),
        description: stripTags(item.description),
      }));
      setCache(menuName, cleaned);
      setItems(cleaned);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setItems([]);
    setError(false);
  }, []);

  return { items, loading, error, search, reset };
}
