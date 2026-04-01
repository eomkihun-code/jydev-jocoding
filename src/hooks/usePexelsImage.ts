import { useState, useCallback } from 'react';
import { PexelsPhoto } from '../types';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY as string;
const CACHE_PREFIX = 'pexels_';

function getCached(key: string): PexelsPhoto[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    return raw ? (JSON.parse(raw) as PexelsPhoto[]) : null;
  } catch {
    return null;
  }
}

function setCache(key: string, photos: PexelsPhoto[]) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(photos));
  } catch {
    // sessionStorage full — ignore
  }
}

export function usePexelsImage() {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchImage = useCallback(async (keyword: string) => {
    setLoading(true);
    setError(false);
    setPhoto(null);

    const cached = getCached(keyword);
    if (cached && cached.length > 0) {
      setPhoto(cached[Math.floor(Math.random() * cached.length)]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=5&orientation=landscape`,
        { headers: { Authorization: API_KEY } }
      );
      if (!res.ok) throw new Error('Pexels API error');
      const data = await res.json() as { photos: PexelsPhoto[] };
      if (data.photos.length === 0) throw new Error('No photos');
      setCache(keyword, data.photos);
      setPhoto(data.photos[Math.floor(Math.random() * data.photos.length)]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return { photo, loading, error, fetchImage };
}
