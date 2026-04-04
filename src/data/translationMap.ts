/** TheMealDB 요리명 → 한국어 번역 */
export const mealNameKo: Record<string, string> = {
  // 중식
  'Beef and Broccoli Stir-Fry': '소고기 브로콜리 볶음',
  'Beef Lo Mein': '소고기 볶음면',
  'Chicken Congee': '닭죽',
  'Chicken Fried Rice': '닭고기 볶음밥',
  'Chinese Orange Chicken': '오렌지 치킨',
  'Chinese Tomato Egg Stir Fry': '토마토 달걀 볶음',
  'Egg Drop Soup': '계란탕',
  'Egg Foo Young': '달걀 부침',
  'General Tsos Chicken': '제너럴 츠 치킨',
  'Hot and Sour Soup': '산라탕',
  'Kung Pao Chicken': '쿵파오 치킨',
  'Kung Po Prawns': '쿵파오 새우',
  'Ma Po Tofu': '마파두부',
  'Napa Cabbage with Dried Shrimp': '배추 새우볶음',
  'Ramen Noodles with Boiled Egg': '라멘',
  'Sesame Cucumber Salad': '참깨 오이무침',
  'Shrimp With Snow Peas': '새우 완두볶음',
  'Sichuan Eggplant': '사천 가지볶음',
  'Sichuan Style Stir-Fried Chinese Long Beans': '사천 풋콩볶음',
  'Silken Tofu with Sesame Soy Sauce': '두부 참깨간장',
  'Singapore Noodles with Shrimp': '싱가포르 누들',
  'Sweet and Sour Chicken': '닭고기 탕수육',
  'Sweet and Sour Pork': '탕수육',
  'Szechuan Beef': '사천 소고기볶음',

  // 일식
  'Chicken Karaage': '닭 가라아게',
  'Honey Teriyaki Salmon': '연어 데리야키',
  'Japanese Katsudon': '가츠동',
  'Katsu Chicken curry': '치킨 카츠카레',
  'Teriyaki Chicken Casserole': '데리야키 치킨',
  'Tonkatsu pork': '돈카츠',
  'Yaki Udon': '야키우동',

  // 양식 - 이탈리안
  'Chicken Alfredo Primavera': '치킨 알프레도 파스타',
  'Chilli prawn linguine': '칠리 새우 링귀네',
  'Fettuccine Alfredo': '페투치네 알프레도',
  'Lasagne': '라자냐',
  'Mediterranean Pasta Salad': '지중해 파스타 샐러드',
  'Pizza Express Margherita': '마르게리타 피자',
  'Potato Gratin with Chicken': '치킨 감자 그라탱',
  'Ribollita': '리볼리타',
  'Salmon Prawn Risotto': '연어 새우 리조또',
  'Spaghetti alla Carbonara': '스파게티 카르보나라',
  'Spaghetti Bolognese': '스파게티 볼로네제',
  'Spicy Arrabiata Penne': '아라비아타 펜네',

  // 양식 - 프렌치
  'Boulangère Potatoes': '불랑제르 포테이토',
  'Chicken Basquaise': '바스크 치킨',
  'Chicken Parmentier': '치킨 파르망티에',
  'French Lentils With Garlic and Thyme': '프렌치 렌틸 수프',
  'French Omelette': '프렌치 오믈렛',
  'French Onion Soup': '프렌치 어니언 수프',
  'Ratatouille': '라따뚜이',
  'Summer Pistou': '피스투 수프',
  'Tuna Nicoise': '니수아즈 샐러드',

  // 양식 - 아메리칸
  '15-minute chicken & halloumi burgers': '치킨 할루미 버거',
  'Banana Pancakes': '바나나 팬케이크',
  'Chicken Fajita Mac and Cheese': '치킨 파히타 맥앤치즈',
  'Chocolate Raspberry Brownies': '초콜릿 라즈베리 브라우니',
  'Clam chowder': '클램 차우더',
  'Grilled Mac and Cheese Sandwich': '그릴드 맥앤치즈 샌드위치',
  'Honey Balsamic Chicken with Crispy Broccoli & Potatoes': '허니 발사믹 치킨',
  'Pancakes': '팬케이크',
  'Peanut Butter Cookies': '피넛버터 쿠키',
  'Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini': '사과 포크찹',
  'Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt': '가지 해리사 구이',
  'Vegan Chocolate Cake': '비건 초콜릿 케이크',

  // 양식 - 브리티시
  'Baked salmon with fennel & tomatoes': '연어 토마토 오븐구이',
  'Bean & Sausage Hotpot': '소시지 핫팟',
  'Beef Dumpling Stew': '소고기 만두 스튜',
  'Broccoli & Stilton soup': '브로콜리 수프',
  'Bubble & Squeak': '버블앤스퀵',
  'Chicken & mushroom Hotpot': '치킨 버섯 핫팟',
  'Corned Beef Hash': '콘드비프 해시',
  'Creamy Tomato Soup': '크리미 토마토 수프',
  'English Breakfast': '영국식 아침식사',
  'Salmon Avocado Salad': '연어 아보카도 샐러드',
  'Smoky Lentil Chili with Squash': '스모키 렌틸 칠리',
  'Vegetarian Chilli': '채소 칠리',
};

export function translateMealName(enName: string): string {
  return mealNameKo[enName] ?? enName;
}

/** TheMealDB 재료명 → 한국어 번역 */
export const ingredientKo: Record<string, string> = {
  // 육류
  'chicken': '닭고기', 'chicken breast': '닭가슴살', 'chicken thighs': '닭넓적다리',
  'beef': '소고기', 'ground beef': '다진 소고기', 'pork': '돼지고기',
  'bacon': '베이컨', 'ham': '햄', 'lamb': '양고기', 'turkey': '칠면조',
  'salmon': '연어', 'tuna': '참치', 'shrimp': '새우', 'prawns': '큰새우',
  'cod': '대구', 'tilapia': '틸라피아', 'clams': '조개',

  // 채소
  'onion': '양파', 'garlic': '마늘', 'ginger': '생강',
  'tomato': '토마토', 'tomatoes': '토마토',
  'carrot': '당근', 'carrots': '당근',
  'potato': '감자', 'potatoes': '감자',
  'bell pepper': '파프리카', 'red pepper': '빨간 고추',
  'mushroom': '버섯', 'mushrooms': '버섯',
  'broccoli': '브로콜리', 'spinach': '시금치',
  'cabbage': '양배추', 'lettuce': '상추',
  'cucumber': '오이', 'zucchini': '주키니',
  'eggplant': '가지', 'aubergine': '가지',
  'celery': '셀러리', 'leek': '대파',
  'corn': '옥수수', 'peas': '완두콩',
  'snow peas': '스냅완두', 'green beans': '풋콩',
  'asparagus': '아스파라거스', 'avocado': '아보카도',

  // 유제품
  'butter': '버터', 'milk': '우유', 'cream': '크림',
  'cheese': '치즈', 'parmesan': '파마산 치즈',
  'egg': '달걀', 'eggs': '달걀',

  // 소스/조미료
  'soy sauce': '간장', 'oyster sauce': '굴소스',
  'olive oil': '올리브유', 'vegetable oil': '식용유',
  'salt': '소금', 'pepper': '후추', 'sugar': '설탕',
  'vinegar': '식초', 'sesame oil': '참기름',
  'chili': '고추', 'chilli': '고추',
  'paprika': '파프리카 가루', 'cumin': '쿠민',
  'oregano': '오레가노', 'basil': '바질',
  'thyme': '타임', 'rosemary': '로즈마리',

  // 기타
  'rice': '쌀', 'pasta': '파스타', 'noodles': '면',
  'bread': '빵', 'flour': '밀가루',
  'lemon': '레몬', 'lime': '라임',
  'tomato sauce': '토마토 소스', 'stock': '육수',
  'chicken stock': '닭 육수', 'beef stock': '소고기 육수',
  'tofu': '두부', 'sesame seeds': '참깨',
};

export function translateIngredient(enName: string): string {
  const lower = enName.toLowerCase();
  return ingredientKo[lower] ?? enName;
}
