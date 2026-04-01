export type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '야식';
export type Difficulty = '쉬움' | '보통' | '어려움';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Menu {
  id: string;
  name: string;
  category: Category;
  keyword: string;
  servings: number;
  cookingTime: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  recipe: string[];
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

export interface NaverBlogItem {
  title: string;
  link: string;
  description: string;
  bloggername: string;
  postdate: string;
}

export interface NaverBlogResponse {
  items: NaverBlogItem[];
  total: number;
}
