/**
 * 문제 있는 45개 메뉴 이미지 재수집 스크립트
 * 실행: node scripts/refetchMenuImages.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const API_KEY = envContent.match(/VITE_PEXELS_API_KEY=(.+)/)?.[1]?.trim();

// 개선된 키워드 목록 (critical-validator 검수 결과)
const REFETCH = [
  // 제네릭 이미지
  { id: 'j01', name: '가츠동', keyword: 'katsudon Japanese pork cutlet egg rice bowl donburi' },
  { id: 'j07', name: '명란 마요 덮밥', keyword: 'Japanese rice bowl donburi egg topping' },
  { id: 'j23', name: '쇼가야키', keyword: 'shogayaki Japanese ginger pork stir fry rice plate' },

  // 김치찌개 사진 오류
  { id: 'k23', name: '부대찌개', keyword: 'budae jjigae Korean army stew sausage spam noodles' },
  { id: 'k24', name: '돼지갈비찜', keyword: 'Korean braised pork ribs soy sauce ganjang galbi jjim' },
  { id: 'k30', name: '묵은지 돼지갈비찜', keyword: 'Korean aged kimchi pork ribs braised stew' },

  // 오징어볶음 사진 오류
  { id: 'k12', name: '닭볶음탕', keyword: 'Korean spicy braised chicken stew vegetables red sauce' },

  // 오야꼬동 사진 오류
  { id: 'j14', name: '버터 간장 계란밥', keyword: 'TKG tamago kake gohan Japanese raw egg soy rice bowl' },
  { id: 'j17', name: '치킨 가라아게', keyword: 'karaage Japanese crispy fried chicken thigh golden' },

  // 마파두부 사진 오류
  { id: 'c18', name: '마라탕', keyword: 'malatang Chinese spicy hot pot soup broth vegetables' },
  { id: 'c19', name: '마라샹궈', keyword: 'mala xiang guo Chinese dry spicy pot stir fry' },

  // 떡볶이 사진 오류
  { id: 'b02', name: '로제 떡볶이', keyword: 'rose tteokbokki Korean creamy pink sauce rice cake' },
  { id: 'b04', name: '치즈 라볶이', keyword: 'rabokki Korean ramen tteokbokki cheese noodles' },
  { id: 'b10', name: '새콤달콤 쫄면', keyword: 'jjolmyeon Korean cold chewy noodles gochujang mixed' },

  // 짜장 사진 오류
  { id: 'c29', name: '굴소스 파기름 볶음면', keyword: 'Chinese stir fried noodles oyster sauce lo mein wok' },

  // 짬뽕 사진 오류
  { id: 'c30', name: '중화식 짬뽕수제비', keyword: 'Korean Chinese seafood spicy soup dough dumpling' },

  // 게살스프 사진 오류
  { id: 'c28', name: '중식 맑은 계란국', keyword: 'Chinese egg drop soup clear broth silky' },

  // 에비동 사진 오류
  { id: 'j27', name: '텐동', keyword: 'tendon Japanese tempura bowl mixed shrimp vegetables rice' },

  // 명란 파스타 사진 오류
  { id: 'w18', name: '명란 크림 파스타', keyword: 'creamy pasta mentaiko cream sauce pink' },

  // 짜장 면 오류
  { id: 'b03', name: '짜장 떡볶이', keyword: 'jajang tteokbokki Korean black bean sauce rice cake' },

  // 참치 김밥 오류 (떡볶이 사진 받음)
  { id: 'b06', name: '참치 마요 김밥', keyword: 'tuna mayo kimbap Korean seaweed rice roll sliced' },

  // 제육볶음 사진 받은 김밥
  { id: 'b07', name: '매콤 제육 김밥', keyword: 'kimbap Korean seaweed rice roll sliced pieces colorful' },

  // 꼬마 김밥
  { id: 'b08', name: '꼬마 김밥', keyword: 'mini kimbap Korean small bite size seaweed rice roll' },

  // 어묵 오류
  { id: 'b13', name: '길거리 어묵탕', keyword: 'Korean fish cake skewer soup street food broth odeng' },

  // 비빔만두 오류
  { id: 'b16', name: '비빔만두', keyword: 'Korean dumplings mixed sauce spicy gochujang mandu' },

  // 떡꼬치 오류
  { id: 'b28', name: '떡꼬치', keyword: 'Korean tteok rice cake skewer street food sweet sauce grilled' },

  // 개별 키워드 불일치
  { id: 'b14', name: '순대 야채볶음', keyword: 'Korean pork intestine sausage sundae stir fry vegetable' },
  { id: 'b29', name: '밥버거', keyword: 'Korean rice burger onigiri bun street food' },
  { id: 'b26', name: '길거리 토스트', keyword: 'Korean egg sandwich toast breakfast street food buttered' },
  { id: 'j21', name: '버터 명란 구이', keyword: 'pollock roe fish roe grilled butter baked Japanese' },
  { id: 'c11', name: '류산슬', keyword: 'Chinese seafood stir fry elegant plate restaurant' },
  { id: 'c25', name: '마늘쫑 돼지고기 볶음', keyword: 'Chinese garlic green shoots pork stir fry wok vegetables' },
  { id: 'c27', name: '양장피', keyword: 'Chinese cold dish transparent noodle seafood colorful' },
  { id: 'k29', name: '뚝배기 불고기', keyword: 'Korean beef claypot stone pot dolsot hot stew' },

  // 추가 중복 처리
  { id: 'c12', name: '홈메이드 짜장면', keyword: 'jajangmyeon Korean Chinese black bean noodles homemade' },
  { id: 'b27', name: '소떡소떡', keyword: 'Korean sausage rice cake skewer sotteok street food grilled' },
  { id: 'b15', name: '군만두', keyword: 'Korean pan fried dumpling mandu crispy golden' },
  { id: 'j25', name: '에비동', keyword: 'Japanese shrimp tempura rice bowl ebi don donburi' },
  { id: 'j28', name: '명란 오일 파스타', keyword: 'mentaiko pasta Japanese oil sauce spicy fish roe' },
  { id: 'c07', name: '게살스프', keyword: 'Chinese crab stick egg drop soup creamy' },
  { id: 'b01', name: '국물 떡볶이', keyword: 'Korean tteokbokki spicy rice cake soup broth street food' },
  { id: 'b05', name: '일반 김밥', keyword: 'Korean gimbap kimbap seaweed rice roll traditional' },
];

const outputPath = path.join(__dirname, '..', 'src', 'data', 'menuImages.json');
const existing = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchPexels(keyword) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=3&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.photos || [];
}

console.log(`🔄 ${REFETCH.length}개 이미지 재수집 시작\n`);

let success = 0, fail = 0, improved = 0;

for (let i = 0; i < REFETCH.length; i++) {
  const { id, name, keyword } = REFETCH[i];
  const oldId = existing[id]?.pexelsId;
  process.stdout.write(`[${String(i+1).padStart(2,'0')}/${REFETCH.length}] ${name.padEnd(14)} `);

  try {
    const photos = await fetchPexels(keyword);
    if (photos.length > 0) {
      const photo = photos[0];
      const newId = photo.id;
      const changed = oldId !== newId;
      existing[id] = {
        name,
        keyword,
        url: photo.src.large,
        thumb: photo.src.medium,
        photographer: photo.photographer,
        pexelsId: newId,
      };
      if (changed) {
        console.log(`✅ 교체 (${oldId} → ${newId})`);
        improved++;
      } else {
        console.log(`➡️  동일 사진 (${newId}) — 키워드 재검토 필요`);
      }
      success++;
    } else {
      console.log(`⚠️  사진 없음`);
      fail++;
    }
  } catch (e) {
    console.log(`❌ ${e.message}`);
    fail++;
  }

  if (i < REFETCH.length - 1) await sleep(400);
}

fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2), 'utf-8');

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ 성공: ${success}개 | 📸 실제 교체: ${improved}개 | ❌ 실패: ${fail}개`);
console.log(`📁 저장: src/data/menuImages.json`);
