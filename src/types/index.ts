export type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '야식';

export interface Menu {
  id: string;
  name: string;
  category: Category;
  keyword: string;
}

export interface PexelsPhoto {
  id: number;
  photographer: string;
  photographer_url: string;
  src: {
    large: string;
    medium: string;
    original: string;
  };
  alt: string;
}

export interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}
