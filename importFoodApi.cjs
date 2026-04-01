const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 1. 환경 변수 확인 및 로드
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const FOOD_API_KEY = process.env.FOOD_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !FOOD_API_KEY) {
  console.error("❌ ERROR: .env 파일에 SUPABASE_URL, SUPABASE_KEY, FOOD_API_KEY가 모두 설정되어 있는지 확인하세요.");
  process.exit(1);
}

// 2. Supabase 클라이언트 초기화
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. 딜레이 함수 선언 (과도한 요청 방지)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function importFoodRecipeData() {
  console.log("🚀 식품의약품안전처 조리식품 레시피 데이터 파싱 및 Supabase 저장을 시작합니다...\n");

  const BATCH_SIZE = 100;
  // 전체 데이터가 대략 1200개 내외라고 가정하고 루프를 돕니다.
  const MAX_ITEMS = 1200; 
  let totalSaved = 0;

  for (let startIdx = 1; startIdx <= MAX_ITEMS; startIdx += BATCH_SIZE) {
    const endIdx = startIdx + BATCH_SIZE - 1;
    const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/${FOOD_API_KEY}/COOKRCP01/json/${startIdx}/${endIdx}`;

    try {
      console.log(`⏳ 데이터 요청 중... [인덱스: ${startIdx} ~ ${endIdx}]`);
      const response = await axios.get(apiUrl);
      
      const data = response.data;
      
      // API 응답 구조 체크
      if (!data || !data.COOKRCP01 || !data.COOKRCP01.row) {
        // 데이터가 없거나 끝에 도달한 경우
        console.log(`⚠️ 인덱스 ${startIdx}~${endIdx} 구간에 유효한 데이터가 없거나 조회를 마쳤습니다.`);
        // COOKRCP01.RESULT.CODE == 'INFO-200' 이면 해당하는 데이터가 없는 것 (종료)
        if (data && data.COOKRCP01 && data.COOKRCP01.RESULT && data.COOKRCP01.RESULT.CODE !== 'INFO-000') {
           console.log(`   (메시지: ${data.COOKRCP01.RESULT.MSG})`);
        }
        break; // 루프 종료
      }

      const rows = data.COOKRCP01.row;
      if (rows.length === 0) break;

      // 4. 데이터 매핑 로직
      const formattedData = rows.map(item => ({
        name: item.RCP_NM, // 메뉴명 (필수 유니크)
        image_url: item.ATT_FILE_NO_MAIN || null, // 메뉴 메인 이미지
        category: item.RCP_PAT2 || null, // 요리 분류
        ingredients: item.RCP_PARTS_DTLS || null, // 재료 설명
        // 칼로리는 문자열일 수 있으므로 숫자형으로 변환. 변환 실패 시 null 처리.
        calories: item.INFO_ENG ? parseFloat(item.INFO_ENG) : null,
      }));

      // 5. Supabase Upsert 처리
      // onConflict 설정을 통해 name이 겹치는 경우 기존 항목이 덮어씌워짐 (업데이트)
      const { error } = await supabase
        .from('menus')
        .upsert(formattedData, { onConflict: 'name' });

      if (error) {
        console.error(`❌ DB 저장 중 에러 발생 [인덱스: ${startIdx} ~ ${endIdx}]:`, error.message);
      } else {
        totalSaved += formattedData.length;
        console.log(`✅ 성공적으로 저장 완료! (+${formattedData.length}건)`);
      }

    } catch (err) {
      console.error(`❌ API 요청 실패 [인덱스: ${startIdx} ~ ${endIdx}]:`, err.message);
      // 에러가 발생해도 스크립트가 멈추지 않도록 하고 다음 루프로 넘어갑니다.
    }

    // 6. 무조건 루프 사이에 약간의 지연 시간을 주어 API 차단을 예방 (1초 대기)
    await sleep(1000);
  }

  console.log(`\n🎉 모든 작업이 완료되었습니다! 총 **${totalSaved}**개의 메뉴 데이터가 Supabase DB에 저장/업데이트 되었습니다.`);
}

importFoodRecipeData();
