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
