/**
 * 식약처 레시피 데이터를 로컬에서 fetch해서 public/data/recipes.json 으로 저장
 * 실행: node scripts/fetch-recipes.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// .env 수동 파싱 (dotenv 없이)
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
for (const line of envContent.split('\n')) {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) envVars[key.trim()] = vals.join('=').trim();
}

const API_KEY = envVars['FOOD_SAFETY_API_KEY'];
if (!API_KEY) {
  console.error('❌ FOOD_SAFETY_API_KEY가 .env에 없어요.');
  process.exit(1);
}

const BATCH_SIZE = 100;
const BASE_URL = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`;

async function fetchBatch(start, end) {
  const url = `${BASE_URL}/${start}/${end}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();
  return data?.COOKRCP01?.row ?? [];
}

async function main() {
  console.log('🍳 식약처 레시피 데이터 fetch 시작...');

  // 먼저 total_count 확인
  const first = await fetch(`${BASE_URL}/1/1`).then(r => r.json());
  const total = parseInt(first?.COOKRCP01?.total_count ?? '0', 10);
  console.log(`📊 총 레시피 수: ${total}개`);

  const allRecipes = [];
  for (let start = 1; start <= total; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE - 1, total);
    process.stdout.write(`  fetch ${start}~${end}...`);
    const rows = await fetchBatch(start, end);
    allRecipes.push(...rows);
    process.stdout.write(` ✓ (${rows.length}개)\n`);
    // rate limit 방지
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n✅ 총 ${allRecipes.length}개 레시피 수집 완료`);

  // public/data 폴더 생성
  const outDir = path.join(__dirname, '..', 'public', 'data');
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, 'recipes.json');
  fs.writeFileSync(outPath, JSON.stringify({ total: allRecipes.length, recipes: allRecipes }), 'utf-8');

  const fileSizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`💾 저장 완료: public/data/recipes.json (${fileSizeMB} MB)`);
}

main().catch(e => { console.error('❌ 오류:', e); process.exit(1); });
