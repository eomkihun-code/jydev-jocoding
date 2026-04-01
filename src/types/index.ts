export type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '야식' | string;
export type Difficulty = '쉬움' | '보통' | '어려움' | string;

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Menu {
  id: string;
  name: string;
  category: Category;
  keyword: string;
  servings: number | string;
  cookingTime: number | string;
  difficulty: Difficulty;
  ingredients: Ingredient[] | string;
  recipe: string[];
  imageUrl?: string;
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
