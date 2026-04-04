import { UnifiedRecipe, RecipeStep } from '../types/recipe';
import { translateMealName, translateIngredient } from '../data/translationMap';

/** TheMealDB area → 한국어 카테고리 */
export const AREA_TO_CATEGORY: Record<string, string> = {
  Chinese: '중식',
  Japanese: '일식',
  Italian: '양식',
  French: '양식',
  American: '양식',
  British: '양식',
  Spanish: '양식',
  Greek: '양식',
  Mexican: '양식',
  Canadian: '양식',
  Jamaican: '양식',
  Moroccan: '양식',
  Indian: '양식',
  Thai: '양식',
  Vietnamese: '양식',
  Turkish: '양식',
  Malaysian: '양식',
  Filipino: '양식',
  Irish: '양식',
  Polish: '양식',
  Portuguese: '양식',
  Russian: '양식',
  Croatian: '양식',
  Dutch: '양식',
  Egyptian: '양식',
  Kenyan: '양식',
  Tunisian: '양식',
  Uruguayan: '양식',
  Ukrainian: '양식',
};

export const FETCH_AREAS = ['Chinese', 'Japanese', 'Italian', 'French', 'American', 'British'];

// 허용된 메뉴 화이트리스트 (영문 원본명 기준)
export const MEALDB_WHITELIST = new Set([
  // 중식
  'Beef and Broccoli Stir-Fry', 'Beef Lo Mein', 'Chicken Congee', 'Chicken Fried Rice',
  'Chinese Orange Chicken', 'Chinese Tomato Egg Stir Fry', 'Egg Drop Soup', 'Egg Foo Young',
  'General Tsos Chicken', 'Hot and Sour Soup', 'Kung Pao Chicken', 'Kung Po Prawns',
  'Ma Po Tofu', 'Napa Cabbage with Dried Shrimp', 'Ramen Noodles with Boiled Egg',
  'Sesame Cucumber Salad', 'Shrimp With Snow Peas', 'Sichuan Eggplant',
  'Sichuan Style Stir-Fried Chinese Long Beans', 'Silken Tofu with Sesame Soy Sauce',
  'Singapore Noodles with Shrimp', 'Sweet and Sour Chicken', 'Sweet and Sour Pork', 'Szechuan Beef',
  // 일식
  'Chicken Karaage', 'Honey Teriyaki Salmon', 'Japanese Katsudon', 'Katsu Chicken curry',
  'Teriyaki Chicken Casserole', 'Tonkatsu pork', 'Yaki Udon',
  // 양식 - 이탈리안
  'Chicken Alfredo Primavera', 'Chilli prawn linguine', 'Fettuccine Alfredo', 'Lasagne',
  'Mediterranean Pasta Salad', 'Pizza Express Margherita', 'Potato Gratin with Chicken',
  'Ribollita', 'Salmon Prawn Risotto', 'Spaghetti alla Carbonara', 'Spaghetti Bolognese',
  'Spicy Arrabiata Penne',
  // 양식 - 프렌치
  'Boulangère Potatoes', 'Chicken Basquaise', 'Chicken Parmentier',
  'French Lentils With Garlic and Thyme', 'French Omelette', 'French Onion Soup',
  'Ratatouille', 'Summer Pistou', 'Tuna Nicoise',
  // 양식 - 아메리칸
  '15-minute chicken & halloumi burgers', 'Banana Pancakes', 'Chicken Fajita Mac and Cheese',
  'Chocolate Raspberry Brownies', 'Clam chowder', 'Grilled Mac and Cheese Sandwich',
  'Honey Balsamic Chicken with Crispy Broccoli & Potatoes', 'Pancakes', 'Peanut Butter Cookies',
  'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini',
  'Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt', 'Vegan Chocolate Cake',
  // 양식 - 브리티시
  'Baked salmon with fennel & tomatoes', 'Bean & Sausage Hotpot', 'Beef Dumpling Stew',
  'Broccoli & Stilton soup', 'Bubble & Squeak', 'Chicken & mushroom Hotpot',
  'Corned Beef Hash', 'Creamy Tomato Soup', 'English Breakfast',
  'Salmon Avocado Salad', 'Smoky Lentil Chili with Squash', 'Vegetarian Chilli',
]);

interface MealListItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends Record<string, string> {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

function parseInstructions(text: string): RecipeStep[] {
  if (!text?.trim()) return [];
  const lines = text
    .split(/\r?\n/)
    .map(l => l.replace(/^(STEP\s*\d+[:\s.-]*|\d+[.\)]\s*)/i, '').trim())
    .filter(l => l.length > 8);
  return lines.map((text, i) => ({ step: i + 1, text, imgUrl: '' }));
}

function buildIngredientsText(meal: MealDetail): string {
  const items: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]?.trim();
    const mea = meal[`strMeasure${i}`]?.trim();
    if (ing) {
      const kr = translateIngredient(ing);
      items.push(mea ? `${kr} ${mea}` : kr);
    }
  }
  return items.join(', ');
}

/** 리스트 아이템(기본 정보)으로 UnifiedRecipe 스텁 생성 */
export function normalizeListItem(item: MealListItem, area: string): UnifiedRecipe {
  const category = AREA_TO_CATEGORY[area] ?? '양식';
  const name = translateMealName(item.strMeal);
  return {
    id: `mealdb_${item.idMeal}`,
    name,
    nameEn: name !== item.strMeal ? item.strMeal : undefined,
    category,
    imageUrl: item.strMealThumb,
    ingredientsText: '',
    steps: [],
    source: 'mealdb',
    detailLoaded: false,
  };
}

/** 상세 정보로 UnifiedRecipe 완성 */
export function normalizeMealDetail(meal: MealDetail): UnifiedRecipe {
  const area = meal.strArea;
  const category = AREA_TO_CATEGORY[area] ?? '양식';
  const name = translateMealName(meal.strMeal);
  return {
    id: `mealdb_${meal.idMeal}`,
    name,
    nameEn: name !== meal.strMeal ? meal.strMeal : undefined,
    category,
    imageUrl: meal.strMealThumb,
    ingredientsText: buildIngredientsText(meal),
    steps: parseInstructions(meal.strInstructions),
    youtubeUrl: meal.strYoutube || undefined,
    source: 'mealdb',
    detailLoaded: true,
  };
}
