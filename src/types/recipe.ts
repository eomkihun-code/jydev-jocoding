export interface FoodRecipe extends Record<string, string> {
  RCP_SEQ: string;
  RCP_NM: string;
  RCP_WAY2: string;
  RCP_PAT2: string;
  INFO_WGT: string;
  INFO_ENG: string;
  INFO_CAR: string;
  INFO_PRO: string;
  INFO_FAT: string;
  INFO_NA: string;
  HASH_TAG: string;
  ATT_FILE_NO_MAIN: string;
  ATT_FILE_NO_MK: string;
  RCP_PARTS_DTLS: string;
  RCP_NA_TIP: string;
  MANUAL01: string; MANUAL_IMG01: string;
  MANUAL02: string; MANUAL_IMG02: string;
  MANUAL03: string; MANUAL_IMG03: string;
  MANUAL04: string; MANUAL_IMG04: string;
  MANUAL05: string; MANUAL_IMG05: string;
  MANUAL06: string; MANUAL_IMG06: string;
  MANUAL07: string; MANUAL_IMG07: string;
  MANUAL08: string; MANUAL_IMG08: string;
  MANUAL09: string; MANUAL_IMG09: string;
  MANUAL10: string; MANUAL_IMG10: string;
  MANUAL11: string; MANUAL_IMG11: string;
  MANUAL12: string; MANUAL_IMG12: string;
  MANUAL13: string; MANUAL_IMG13: string;
  MANUAL14: string; MANUAL_IMG14: string;
  MANUAL15: string; MANUAL_IMG15: string;
  MANUAL16: string; MANUAL_IMG16: string;
  MANUAL17: string; MANUAL_IMG17: string;
  MANUAL18: string; MANUAL_IMG18: string;
  MANUAL19: string; MANUAL_IMG19: string;
  MANUAL20: string; MANUAL_IMG20: string;
}

export interface FoodApiResponse {
  COOKRCP01: {
    total_count: string;
    row: FoodRecipe[];
    RESULT: { CODE: string; MSG: string };
  };
}

export interface RecipeStep {
  step: number;
  text: string;
  imgUrl: string;
}

export interface ParsedIngredient {
  section: string;
  items: string[];
}

export interface UnifiedRecipe {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  imageUrl: string;
  ingredientsText: string;
  steps: RecipeStep[];
  youtubeUrl?: string;
  source: 'korean' | 'mealdb' | 'static';
  detailLoaded: boolean;
  // 한식 전용
  subCategory?: string;
  cookingMethod?: string;
  hashTags?: string;
  nutrition?: { cal: string; carb: string; pro: string; fat: string; na: string };
  naTip?: string;
  foodRecipe?: FoodRecipe;
  // static 메뉴 전용
  tags?: string[];
  time?: number;
  difficulty?: 1 | 2 | 3;
  isKidFriendly?: boolean;
  kidSpicy?: boolean;
}
