const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 1. 설정
const FOOD_API_KEY = process.env.FOOD_API_KEY;
const TARGET_FILE = path.join(__dirname, 'src', 'data', 'menuData.ts');

if (!FOOD_API_KEY) {
  console.error("❌ ERROR: .env 파일에 FOOD_API_KEY가 설정되어 있지 않습니다.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllRecipes() {
  console.log("🚀 식약처 레시피 API 데이터 추출을 시작합니다...");

  let allApiMenus = [];
  const BATCH_SIZE = 100;
  const MAX_ITEMS = 1200; // 대략적인 전체 데이터 수

  for (let startIdx = 1; startIdx <= MAX_ITEMS; startIdx += BATCH_SIZE) {
    const endIdx = startIdx + BATCH_SIZE - 1;
    const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/${FOOD_API_KEY}/COOKRCP01/json/${startIdx}/${endIdx}`;

    try {
      console.log(`⏳ 데이터 요청 중... [${startIdx} ~ ${endIdx}]`);
      const response = await axios.get(apiUrl);
      const data = response.data.COOKRCP01;

      if (!data || !data.row || data.row.length === 0) {
        console.log("✅ 모든 데이터를 가져왔습니다.");
        break;
      }

      const mapped = data.row.map((item, idx) => {
        // 레시피 단계 추출 (MANUAL01, MANUAL02...)
        const recipeSteps = [];
        for (let i = 1; i <= 20; i++) {
          const stepKey = `MANUAL${String(i).padStart(2, '0')}`;
          if (item[stepKey]) {
            // "1. 재료를 썬다." -> "재료를 썬다." 식의 번호 제거 (우리는 어차피 번호를 붙여서 보여줌)
            const cleanStep = item[stepKey].replace(/^\d+\.\s*/, '').trim();
            if (cleanStep) recipeSteps.push(cleanStep);
          }
        }

        return {
          id: `api_${startIdx + idx}`,
          name: item.RCP_NM,
          category: item.RCP_PAT2,
          keyword: item.RCP_NM, // Pexels 호환용 키워드
          servings: 1, // API에 정보가 없으면 기본 1
          cookingTime: 30, // API에 정보가 없으면 기본 30
          difficulty: '보통',
          ingredients: item.RCP_PARTS_DTLS || '',
          recipe: recipeSteps,
          imageUrl: item.ATT_FILE_NO_MAIN || undefined
        };
      });

      allApiMenus = [...allApiMenus, ...mapped];
    } catch (err) {
      console.error(`❌ 에러 발생 [${startIdx} ~ ${endIdx}]:`, err.message);
    }
    await sleep(500); // API 부하 방지
  }

  return allApiMenus;
}

async function run() {
  try {
    // 1. 기존 파일 읽기
    const currentContent = fs.readFileSync(TARGET_FILE, 'utf-8');
    
    // 2. 기존 수동 메뉴 보존 (REGEX로 'menus' 배열 안의 수동 메뉴만 추출)
    // 수동 메뉴는 id가 k, c, j, w, b, n 등으로 시작함
    const jsonMatch = currentContent.match(/export const menus: Menu\[\] = (\[[\s\S]*?\]);/);
    let manualMenus = [];
    if (jsonMatch) {
      try {
        // 기존 데이터를 가져와서 id가 'api_'로 시작하지 않는 것들만 필터링
        // ( eval을 쓰는 것은 위험하지만 로컬 빌드 스크립트이므로 편의상 사용하거나 JSON.parse 시도)
        // 여기서는 안전하게 텍스트 기반으로 api_ 데이터가 없는 초기 36개를 가져옵니다.
        const allCurrent = eval(jsonMatch[1].replace(/import { Menu } from '\.\.\/types';/, ''));
        manualMenus = allCurrent.filter(m => !m.id.startsWith('api_'));
        console.log(`📦 기존 수동 메뉴 ${manualMenus.length}개를 보존합니다.`);
      } catch (e) {
        console.warn("⚠️ 기존 메뉴 파싱 실패. 새로 시작합니다.");
      }
    }

    const apiRecipes = await fetchAllRecipes();

    // 3. 중복 제거 (이름 기준)
    const manualNames = new Set(manualMenus.map(m => m.name));
    const uniqueApiRecipes = apiRecipes.filter(r => !manualNames.has(r.name));

    const finalMenus = [...manualMenus, ...uniqueApiRecipes];

    const finalFileContent = `import { Menu } from '../types';

export const menus: Menu[] = ${JSON.stringify(finalMenus, null, 2)};

export const categories = ['한식', '중식', '일식', '양식', '분식', '야식'] as const;
`;

    fs.writeFileSync(TARGET_FILE, finalFileContent);
    console.log(`\n✅ 성공! 총 ${finalMenus.length}개(수동 ${manualMenus.length}개 + API ${uniqueApiRecipes.length}개)의 메뉴 데이터가 저장되었습니다.`);
    console.log("💡 이제 사이트를 다시 빌드하거나 'npm run dev'로 확인하세요.");

  } catch (err) {
    console.error("❌ 실행 중 오류 발생:", err);
  }
}

run();
