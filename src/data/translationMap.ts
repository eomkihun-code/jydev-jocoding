/** TheMealDB 요리명 → 한국어 번역 (잘 알려진 요리만) */
export const mealNameKo: Record<string, string> = {
  // 중식
  'kung pao chicken': '궁보계정 (쿵파오 치킨)',
  'sweet and sour pork': '탕수육',
  'beef chow mein': '소고기 차우면',
  'fried rice': '볶음밥',
  'dim sum': '딤섬',
  'peking duck': '북경오리',
  'mapo tofu': '마파두부',
  'wonton soup': '완탕수프',
  'spring rolls': '춘권',
  'char siu pork': '차슈 돼지고기',
  'egg fried rice': '계란 볶음밥',

  // 일식
  'chicken teriyaki': '치킨 데리야키',
  'beef teriyaki': '소고기 데리야키',
  'salmon teriyaki': '연어 데리야키',
  'tonkatsu pork': '돈카츠',
  'katsu chicken': '치킨 카츠',
  'japanese cheesecake': '일본식 치즈케이크',
  'sukiyaki': '스키야키',
  'oyakodon': '오야코동',
  'chicken yakitori': '야키토리',
  'miso soup': '미소국',
  'tempura udon': '텐푸라 우동',

  // 양식 (이탈리아)
  'spaghetti bolognese': '스파게티 볼로네제',
  'spaghetti carbonara': '스파게티 카르보나라',
  'lasagne': '라자냐',
  'pizza express margherita': '마르게리타 피자',
  'tiramisu': '티라미수',
  'panna cotta': '판나코타',
  'ribollita': '리볼리타',
  'pasta e fagioli': '파스타 에 파졸리',

  // 양식 (프랑스)
  'french onion soup': '프렌치 어니언 수프',
  'coq au vin': '코코뱅',
  'beef bourguignon': '비프 부르기뇽',
  'croissants': '크루아상',
  'crepes suzette': '크레페 쉬제트',

  // 양식 (미국/영국)
  'chicken wings': '치킨 윙',
  'fish pie': '피시 파이',
  'beef and mustard pie': '비프 머스터드 파이',
  'scrambled eggs': '스크램블 에그',
  'mac and cheese': '맥앤치즈',
  'bbq pulled pork': 'BBQ 풀드포크',
  'hamburgers': '햄버거',
  'chocolate brownie': '초콜릿 브라우니',

  // 양식 (스페인/그리스)
  'paella': '파에야',
  'greek salad': '그리스 샐러드',
  'moussaka': '무사카',
};

/** TheMealDB 재료명 → 한국어 번역 */
export const ingredientKo: Record<string, string> = {
  // 육류
  'chicken': '닭고기', 'chicken breast': '닭가슴살', 'chicken thighs': '닭넓적다리',
  'beef': '소고기', 'ground beef': '다진 소고기', 'pork': '돼지고기',
  'bacon': '베이컨', 'ham': '햄', 'lamb': '양고기', 'turkey': '칠면조',
  'salmon': '연어', 'tuna': '참치', 'shrimp': '새우', 'prawns': '큰새우',
  'cod': '대구', 'tilapia': '틸라피아',

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
  'eggplant': '가지', 'celery': '셀러리',
  'corn': '옥수수', 'peas': '완두콩',
  'leek': '리크', 'spring onions': '쪽파',

  // 소스/조미료
  'soy sauce': '간장', 'oyster sauce': '굴소스',
  'fish sauce': '피쉬소스', 'sesame oil': '참기름',
  'olive oil': '올리브오일', 'vegetable oil': '식용유',
  'salt': '소금', 'sugar': '설탕', 'pepper': '후추',
  'vinegar': '식초', 'honey': '꿀',
  'ketchup': '케첩', 'mustard': '머스터드',
  'mayonnaise': '마요네즈',
  'worcestershire sauce': '우스터소스',
  'tabasco': '타바스코',

  // 양념/향신료
  'cumin': '쿠민', 'coriander': '고수',
  'paprika': '파프리카 파우더', 'turmeric': '강황',
  'chili powder': '고춧가루', 'cayenne pepper': '카옌페퍼',
  'oregano': '오레가노', 'basil': '바질',
  'thyme': '타임', 'rosemary': '로즈마리',
  'bay leaves': '월계수잎', 'parsley': '파슬리',
  'cilantro': '고수', 'mint': '민트',
  'cinnamon': '시나몬', 'nutmeg': '너트메그',
  'star anise': '팔각',

  // 유제품
  'butter': '버터', 'milk': '우유',
  'cream': '크림', 'heavy cream': '생크림',
  'cheese': '치즈', 'parmesan': '파르메산 치즈',
  'mozzarella': '모짜렐라 치즈',
  'egg': '달걀', 'eggs': '달걀',

  // 곡물/면/빵
  'flour': '밀가루', 'rice': '쌀', 'pasta': '파스타',
  'spaghetti': '스파게티', 'noodles': '면',
  'bread': '빵', 'breadcrumbs': '빵가루',
  'panko breadcrumbs': '판코 빵가루',

  // 기타
  'lemon': '레몬', 'lime': '라임',
  'coconut milk': '코코넛밀크', 'tofu': '두부',
  'sesame seeds': '참깨', 'peanuts': '땅콩',
  'cashews': '캐슈넛', 'almonds': '아몬드',
  'wine': '와인', 'red wine': '레드와인', 'white wine': '화이트와인',
  'stock': '육수', 'chicken stock': '닭육수', 'beef stock': '소고기육수',
  'tomato paste': '토마토 페이스트',
  'tomato puree': '토마토 퓨레',
  'olive': '올리브', 'capers': '케이퍼',
  'tahini': '타히니', 'miso': '미소',
  'sake': '청주', 'mirin': '미림',
};

export function translateMealName(enName: string): string {
  return mealNameKo[enName.toLowerCase()] ?? enName;
}

export function translateIngredient(enName: string): string {
  return ingredientKo[enName.toLowerCase()] ?? enName;
}
