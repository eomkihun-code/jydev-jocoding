/**
 * 150개 메뉴 Pexels 이미지 사전 수집 스크립트
 * 실행: node scripts/fetchMenuImages.mjs
 * 출력: src/data/menuImages.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// .env 파일에서 API 키 읽기
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const API_KEY = envContent.match(/VITE_PEXELS_API_KEY=(.+)/)?.[1]?.trim();

if (!API_KEY) {
  console.error('❌ VITE_PEXELS_API_KEY not found in .env');
  process.exit(1);
}

// menus.ts에서 데이터 추출 (간단히 파싱)
const menusPath = path.join(__dirname, '..', 'src', 'data', 'menus.ts');
const menusContent = fs.readFileSync(menusPath, 'utf-8');

// imageKeyword 파싱
const menuEntries = [];
const regex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'[^}]+imageKeyword:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(menusContent)) !== null) {
  menuEntries.push({ id: match[1], name: match[2], keyword: match[3] });
}

console.log(`📋 총 ${menuEntries.length}개 메뉴 이미지 수집 시작\n`);

const results = {};
const failures = [];

async function fetchPexels(keyword) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=3&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.photos || [];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let success = 0;
let fail = 0;

for (let i = 0; i < menuEntries.length; i++) {
  const { id, name, keyword } = menuEntries[i];
  process.stdout.write(`[${String(i + 1).padStart(3, ' ')}/${menuEntries.length}] ${name.padEnd(16)} `);

  try {
    const photos = await fetchPexels(keyword);
    if (photos.length > 0) {
      const photo = photos[0];
      results[id] = {
        name,
        keyword,
        url: photo.src.large,
        thumb: photo.src.medium,
        photographer: photo.photographer,
        pexelsId: photo.id,
      };
      console.log(`✅ ${photo.src.large.substring(0, 60)}...`);
      success++;
    } else {
      results[id] = { name, keyword, url: null, thumb: null };
      console.log(`⚠️  사진 없음`);
      failures.push({ id, name, keyword, reason: 'no_photos' });
      fail++;
    }
  } catch (e) {
    results[id] = { name, keyword, url: null, thumb: null };
    console.log(`❌ 오류: ${e.message}`);
    failures.push({ id, name, keyword, reason: e.message });
    fail++;
  }

  // Rate limit 방지: 요청 사이 400ms 대기
  if (i < menuEntries.length - 1) await sleep(400);
}

// 결과 저장
const outputPath = path.join(__dirname, '..', 'src', 'data', 'menuImages.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ 성공: ${success}개`);
console.log(`❌ 실패: ${fail}개`);
console.log(`📁 저장: src/data/menuImages.json`);

if (failures.length > 0) {
  console.log(`\n⚠️  수동 교체 필요 목록:`);
  failures.forEach(f => console.log(`  - [${f.id}] ${f.name} (${f.reason})`));

  const failPath = path.join(__dirname, '..', 'src', 'data', 'menuImages.failures.json');
  fs.writeFileSync(failPath, JSON.stringify(failures, null, 2), 'utf-8');
  console.log(`\n📁 실패 목록 저장: src/data/menuImages.failures.json`);
}
