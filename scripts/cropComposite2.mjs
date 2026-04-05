/**
 * 3×5 격자 이미지 크롭
 * 실행: node scripts/cropComposite2.mjs
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT = path.join(__dirname, 'food_composite2.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'menus');

// 3행 × 5열 순서대로
const GRID = [
  { id: 'k05', name: '소고기 미역국' },
  { id: 'k07', name: '고등어 김치조림' },
  { id: 'k10', name: '소고기 맑은 무국' },
  { id: 'k08', name: '치즈 계란말이' },
  { id: 'k08b', name: '치즈 계란말이(중복-스킵)' },
  { id: 'k11', name: '간장 찜닭' },
  { id: 'k12', name: '닭볶음탕' },
  { id: 'k21', name: '꽈리고추 멸치볶음' },
  { id: 'k24', name: '돼지갈비찜' },
  { id: 'k23', name: '부대찌개' },
  { id: 'k26', name: '우렁 강된장과 양배추쌈' },
  { id: 'c01', name: '짜장밥' },
  { id: 'c21', name: '유린기' },
  { id: 'c26', name: '해물 누룽지탕' },
  { id: 'c27', name: '양장피' },
];

const ROWS = 3, COLS = 5;

async function run() {
  const meta = await sharp(INPUT).metadata();
  const { width, height } = meta;
  console.log(`📐 원본: ${width}×${height}`);
  const cellW = Math.floor(width / COLS);
  const cellH = Math.floor(height / ROWS);
  console.log(`✂️  셀: ${cellW}×${cellH}\n`);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const idx = row * COLS + col;
      const { id, name } = GRID[idx];
      if (id.endsWith('b')) { console.log(`[${idx+1}/15] ${name} → 스킵`); continue; }
      const outPath = path.join(OUTPUT_DIR, `${id}.jpg`);
      await sharp(INPUT)
        .extract({ left: col * cellW, top: row * cellH, width: cellW, height: cellH })
        .resize(800, 600, { fit: 'cover' })
        .jpeg({ quality: 88 })
        .toFile(outPath);
      console.log(`[${idx+1}/15] ✅ ${name} → ${id}.jpg`);
    }
  }

  // menuImages.json 업데이트
  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'menuImages.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const updates = GRID.filter(g => !g.id.endsWith('b'));
  for (const { id } of updates) {
    if (data[id]) {
      data[id].url = `/images/menus/${id}.jpg`;
      data[id].thumb = `/images/menus/${id}.jpg`;
      data[id].local = true;
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`\n✅ menuImages.json 업데이트 완료 (${updates.length}개)`);
}

run().catch(console.error);
