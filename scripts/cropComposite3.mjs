import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT = path.join(__dirname, 'food_composite3.png');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'menus');

// 3행 × 4열
const GRID = [
  { id: 'j06',  name: '사케동' },
  { id: 'j08',  name: '밀푀유 나베' },
  { id: 'j09',  name: '스키야키' },
  { id: 'j19',  name: '참치 마요 덮밥' },
  { id: 'j20',  name: '고로케와 양배추 샐러드' },
  { id: 'j21',  name: '버터 명란 구이' },
  { id: 'j28',  name: '명란 오일 파스타' },
  { id: 'w14',  name: '떠먹는 피자' },
  { id: 'b21',  name: '계란 푼 떡만두 라면' },
  { id: 'b25',  name: '피자빵' },
  { id: 'b26',  name: '길거리 토스트' },
  { id: 'b27',  name: '소떡소떡' },
];

const ROWS = 3, COLS = 4;

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
      const outPath = path.join(OUTPUT_DIR, `${id}.jpg`);
      await sharp(INPUT)
        .extract({ left: col * cellW, top: row * cellH, width: cellW, height: cellH })
        .resize(800, 600, { fit: 'cover' })
        .jpeg({ quality: 88 })
        .toFile(outPath);
      console.log(`[${idx+1}/12] ✅ ${name} → ${id}.jpg`);
    }
  }

  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'menuImages.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  for (const { id } of GRID) {
    if (data[id]) {
      data[id].url = `/images/menus/${id}.jpg`;
      data[id].thumb = `/images/menus/${id}.jpg`;
      data[id].local = true;
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`\n✅ menuImages.json 업데이트 완료 (${GRID.length}개)`);
}

run().catch(console.error);
