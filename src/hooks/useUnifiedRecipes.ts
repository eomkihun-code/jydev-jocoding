import { useMemo } from 'react';
import { UnifiedRecipe, FoodRecipe } from '../types/recipe';
import { useFoodRecipe } from './useFoodRecipe';
import { useMealDbRecipes } from './useMealDbApi';

const TOP_CATEGORIES = ['한식', '중식', '일식', '양식', '분식'] as const;

// 분식집 핵심 메뉴 키워드
const BUNSIK_CORE = ['떡볶이', '순대', '어묵', '오뎅', '김밥', '쫄면', '라볶이', '호떡', '핫도그', '삼각김밥', '떡꼬치'];
const BUNSIK_CONDITIONAL = ['라면', '우동'];
const BUNSIK_EXCLUDE = ['월남쌈', '샐러드라면', '삼겹살라면', '숙주라면', '라면크로켓', '꼬치구이'];

function isBunsik(name: string): boolean {
  if (BUNSIK_CORE.some(kw => name.includes(kw))) return true;
  if (BUNSIK_EXCLUDE.some(ex => name.includes(ex))) return false;
  return BUNSIK_CONDITIONAL.some(kw => name.includes(kw));
}

// 한식 허용 메뉴 화이트리스트
const KOREAN_WHITELIST = new Set([
  // 반찬
  '새우 두부 계란찜', '부추 콩가루 찜', '방울토마토 소박이', '순두부 사과 소스 오이무침',
  '치커리샐러드와 올리브 마늘 소스', '스트로베리 샐러드', '시금치 우유 소스와 그린매쉬드포테이토',
  '버섯구이와 두부타르타르 소스', '구운채소와 간장레몬 소스', '브로콜리 컬리플라워 샐러드와 두유 요거트 소스',
  '양배추감자전', '돌나물 샐러드', '유자 대구조림', '파프리카 물김치', '인삼떡갈비',
  '훈제오리가슴살 샐러드', '오징어구이', '토마토소고기장조림', '토마토소고기찜', '맛간장삼치구이',
  '삼겹살꼬치구이', '라이스버거떡갈비', '고추김치', '누룽닭', '코코넛밀크카레', '둥지튀김',
  '유자삼치구이', '닭고기또띠아', '콜라비오미자 물김치', '표고버섯 감자찜', '아몬드치킨볼',
  '양배추롤', '생선베이컨말이', '콩고기샐러드', '퀴노아닭가슴살샐러드', '매실동치미',
  '조기까스', '연근초무침', '코다리맑은찜', '뿌리채소두부선', '사과장아찌', '참외깍두기',
  '새콤한연어샐러드', '세가지샐러드', '애호박들깨볶음', '고구마바나나샐러드',
  // 국&찌개
  '사과 새우 북엇국', '저염 된장으로 맛을 낸 황태해장국', '된장국', '표고버섯 청경채국',
  '된장 두부찌개', '부대된장찌개', '황태미역 곤약스프', '닭고기김치찌개', '완자김치찌개',
  '백김치콩비지찌개', '오징어김치찌개', '해물김치찌개', '맑은부대찌개', '나가사키부대찌개',
  '삼계부대찌개', '쑥갓부대찌개', '들깨순두부찌개', '백태순두부찌개', '버섯순두부찌개',
  '토란순두부찌개', '감자느타리버섯국', '해물들깨탕', '코다리맑은탕', '주꾸미연포탕',
  '황태두부무국', '관자해장국', '견과류들깨해장탕', '뿌리채소들깨수제비', '대구지리탕',
  '양지해장국', '토마토돼지고기해장국', '해물토마토김치찌개', '새우단배추된장국',
  '검은콩보리된장찌개', '단호박배추된장국', '된장냉국', '들깨된장육개장', '샤브된장국',
  '완자된장국', '산나물된장찌개', '토마토요구르트된장국', '굴림만두된장국', '해물순두부된장찌개',
  '된장시금치옹심이', '매생이순두부탕', '토마토맑은장국', '홍합 쌀옹심이국', '맑은육개장', '배추만두탕',
  // 일품
  '닭가슴살 브로콜리 만두', '함초 냉이 국수', '우렁된장소스 배추롤', '검은콩국수',
  '토마토스프파스타', '다이어트국수', '호박죽', '냉토마토파스타', '연어차우더스프',
  '시금치브로컬리 파스타', '카레탄두리치킨과 닭가슴살냉채', '크림소스치킨롤', '바나나크림파스타',
  '산채쌀파스타', '황태포당면국수', '닭갈비볶음면', '오색볶음면', '로제소스라면', '삼겹살라면',
  '유자샐러드라면', '연어오븐구이', '콩비지포카치아 샌드위치', '닭고기 완자삼계죽', '삼색소면',
  '열무김치파스타', '삼색샌드위치', '조개크림파스타', '닭고기채소스파게티', '관자브로콜리스프',
  '냉파스타', '오렌지마리네이드 돼지고기', '청국장 두부 검은깨 냉스프', '호박 고구마 스프',
  '토마토라면', '토마토샐러드라면', '비타민이유식', '간장곤약볶음국수', '간편콩국수',
  '블루베리냉스프', '브로콜리스프', '실곤약팟타야', '깐풍파스타', '황태볶음면', '표고크림파스타',
  '떡갈비통치미국수', '단호박크림파스타', '바지락실곤약파스타', '단호박 된장매쉬와 해물굴림만두',
  // 밥
  '새우아욱죽', '소고기리조또롤', '오이냉국을 곁들인 오색쌈밥', '찬밥이용닭죽', '파인애플볶음밥',
  '옥음밥', '와사비 연어초밥', '대하마늘볶음밥', '미역볶음밥', '청국장볶음밥', '해물볶음밥',
  '토마토카레 채소볶음밥', '구운주먹밥', '깐풍주먹밥', '닭봉주먹밥', '봄주먹밥', '깻잎장아찌롤',
  '참치비빔밥롤', '새싹참치김밥', '오징어불고기김밥', '닭가슴살청포묵비빔밥', '채소비빔밥',
  '버섯곤드레밥', '묵계밥', '근채류주먹밥', '단호박약식', '밥핫도그', '꽃밥', '떡갈비주먹밥',
  '홍합죽', '해산물리조또', '두부청국장죽', '주꾸미보리죽', '겨자아욱쌈밥', '시금치 리조또',
  '북어비빔밥', '무 현미밥', '컵밥', '가지볶음밥', '닭고기볶음밥', '닭가슴살리조또',
  '강황고구마밥', '두부달걀덮밥', '봄나물밥', '불고기덮밥', '바비큐리조또', '크렌베리귀리밥',
  '매생이찰범벅', '치즈리조또',
  // 후식
  '오렌지와 당근 만남주스', '배숙구이', '토마토젤리', '구운 바나나', '녹차귀리라떼', '고구마라떼',
  '홍시곶감화채', '카스텔라케이크와 해독주스', '우무오미자냉화채', '포도호두스무디', '단호박푸딩',
  '오이 소르베', '초코치즈크림케이크', '홍시에이드', '과일 젤리', '복숭아샤벳', '과일 주스 조림',
  '살레마이슈', '야채빵', '세 가지 맛 공기과자', '홍시 생밤 무침', '두부 깻잎 과자',
  '멸치 누룽지과자', '복숭아 화채', '사과 포도주스 조림', '홍시 쉐이크', '김치떡', '누룽지 피자',
  '롤피자', '초코바나나 두부크림빵', '당근새우 카나페', '낫토 시래기 라이스전', '콩감태유자 스콘',
  '호두 사과 샐러드', '고구마란', '과일 파이', '식혜 팥빙수', '야채칩', '현미 크레이프',
  '자색고구마호떡', '오븐에 구운 또띠아 칩과 아보카도 딥', '절편꽃말이떡', '다시마칩',
  '딸기연두부쉐이크', '건강 마늘 꿀환',
]);

function normalizeKorean(r: FoodRecipe): UnifiedRecipe {
  const category = isBunsik(r.RCP_NM) ? '분식' : '한식';
  return {
    id: `korean_${r.RCP_SEQ}`,
    name: r.RCP_NM,
    category,
    subCategory: r.RCP_PAT2,
    cookingMethod: r.RCP_WAY2,
    hashTags: r.HASH_TAG,
    imageUrl: r.ATT_FILE_NO_MAIN || r.ATT_FILE_NO_MK || '',
    ingredientsText: r.RCP_PARTS_DTLS ?? '',
    steps: [],
    nutrition: {
      cal: r.INFO_ENG, carb: r.INFO_CAR,
      pro: r.INFO_PRO, fat: r.INFO_FAT, na: r.INFO_NA,
    },
    naTip: r.RCP_NA_TIP,
    source: 'korean',
    detailLoaded: true,
    foodRecipe: r,
  };
}

export function useUnifiedRecipes() {
  const { recipes: korean, loading: kLoading, error } = useFoodRecipe();
  const { meals: mealdb, loading: mLoading } = useMealDbRecipes();

  const loading = kLoading || mLoading;

  const koreanUnified = useMemo(
    () => korean.map(normalizeKorean).filter(r => KOREAN_WHITELIST.has(r.name)),
    [korean]
  );

  const all = useMemo(() => [...koreanUnified, ...mealdb], [koreanUnified, mealdb]);

  function getFiltered(category: string | null): UnifiedRecipe[] {
    if (!category) return all;
    return all.filter(r => r.category === category);
  }

  return {
    all,
    loading,
    error,
    categories: TOP_CATEGORIES as readonly string[],
    getFiltered,
    totalKorean: korean.length,
    totalMealDb: mealdb.length,
  };
}
