/**
 * 16개 음식 합성 이미지 크롭 스크립트
 * 실행: node scripts/cropComposite.mjs
 * 입력: scripts/food_composite.jpg
 * 출력: public/images/menus/*.jpg
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT = path.join(__dirname, 'food_composite.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'menus');

// 4x4 격자 순서대로 파일명 매핑
const GRID = [
  // row 0
  { id: 'k30', name: '묵은지 돼지갈비찜' },
  { id: 'j14', name: '버터 간장 계란밥' },
  { id: 'j25', name: '에비동' },
  { id: 'j27', name: '텐동' },
  // row 1
  { id: 'c28', name: '중식 맑은 계란국' },
  { id: 'c30', name: '짬뽕수제비' },
  { id: 'b03', name: '짜장 떡볶이' },
  { id: 'b04', name: '치즈 라볶이' },
  // row 2
  { id: 'b13', name: '길거리 어묵탕' },
  { id: 'b14', name: '순대 야채볶음' },
  { id: 'b15', name: '군만두' },
  { id: 'b16', name: '비빔만두' },
  // row 3
  { id: 'b28', name: '떡꼬치' },
  { id: 'b29', name: '밥버거' },
  { id: 'c12', name: '홈메이드 짜장면' },
  { id: 'extra', name: '에비동(중복-스킵)' },
];

async function run() {
  const meta = await sharp(INPUT).metadata();
  const { width, height } = meta;
  console.log(`📐 원본 크기: ${width}×${height}`);

  const cellW = Math.floor(width / 4);
  const cellH = Math.floor(height / 4);
  console.log(`✂️  셀 크기: ${cellW}×${cellH}\n`);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const idx = row * 4 + col;
      const { id, name } = GRID[idx];

      if (id === 'extra') {
        console.log(`[${idx + 1}/16] ${name} → 스킵`);
        continue;
      }

      const left = col * cellW;
      const top = row * cellH;
      const outPath = path.join(OUTPUT_DIR, `${id}.jpg`);

      await sharp(INPUT)
        .extract({ left, top, width: cellW, height: cellH })
        .resize(800, 600, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toFile(outPath);

      console.log(`[${idx + 1}/16] ✅ ${name} → public/images/menus/${id}.jpg`);
    }
  }

  console.log('\n🎉 크롭 완료! src/data/menuImages.json 업데이트 필요');
}

run().catch(console.error);
