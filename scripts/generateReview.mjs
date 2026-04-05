import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/menuImages.json'), 'utf-8'));

// menus.ts에서 id, name, category 파싱
const menusContent = fs.readFileSync(path.join(__dirname, '../src/data/menus.ts'), 'utf-8');
const menuMap = {};
const regex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)'/g;
let m;
while ((m = regex.exec(menusContent)) !== null) {
  menuMap[m[1]] = { name: m[2], category: m[3] };
}

const categories = ['한식', '중식', '일식', '양식', '분식'];
const catColors = { '한식': '#fef3c7', '중식': '#fee2e2', '일식': '#eff6ff', '양식': '#f0fdf4', '분식': '#f5f3ff' };

let html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>이미지 검수 - 150개 메뉴</title>
<style>
  body { font-family: sans-serif; margin: 0; padding: 20px; background: #f9fafb; }
  h1 { text-align: center; color: #dc2626; }
  .summary { text-align: center; color: #6b7280; margin-bottom: 30px; font-size: 14px; }
  .cat-section { margin-bottom: 50px; }
  .cat-title { font-size: 22px; font-weight: bold; padding: 10px 16px; border-radius: 12px; margin-bottom: 16px; display: inline-block; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.1); border: 2px solid transparent; }
  .card:hover { border-color: #dc2626; }
  .img-wrap { width: 100%; aspect-ratio: 4/3; background: #f3f4f6; overflow: hidden; position: relative; }
  .img-wrap img { width: 100%; height: 100%; object-fit: contain; }
  .img-wrap .no-img { display: flex; align-items: center; justify-content: center; height: 100%; font-size: 40px; }
  .info { padding: 10px 12px; }
  .id { font-size: 11px; color: #9ca3af; font-family: monospace; }
  .name { font-size: 15px; font-weight: bold; color: #111; margin: 2px 0; }
  .local-badge { font-size: 10px; background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 99px; display: inline-block; }
  .pexels-badge { font-size: 10px; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 99px; display: inline-block; }
  .nav { position: sticky; top: 0; background: white; z-index: 10; padding: 10px 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); display: flex; gap: 10px; flex-wrap: wrap; }
  .nav a { text-decoration: none; color: #dc2626; font-weight: bold; font-size: 14px; padding: 4px 12px; border-radius: 99px; border: 1px solid #fca5a5; }
  .nav a:hover { background: #fee2e2; }
</style>
</head>
<body>
<div class="nav">
  <span style="font-weight:bold;color:#374151">이미지 검수</span>
  ${categories.map(c => `<a href="#cat-${c}">${c}</a>`).join('')}
</div>
<h1>🍽️ 150개 메뉴 이미지 검수</h1>
<p class="summary">이미지를 확인하고 교체 필요한 항목의 ID를 메모해주세요</p>
`;

for (const cat of categories) {
  const items = Object.entries(data).filter(([id]) => menuMap[id]?.category === cat);
  html += `<div class="cat-section" id="cat-${cat}">
  <div class="cat-title" style="background:${catColors[cat]}">${cat} (${items.length}개)</div>
  <div class="grid">`;

  for (const [id, item] of items) {
    const isLocal = item.local;
    const imgUrl = item.url;
    const name = menuMap[id]?.name || item.name;
    html += `
    <div class="card" title="${id}">
      <div class="img-wrap">
        ${imgUrl
          ? `<img src="${imgUrl}" alt="${name}" onerror="this.parentElement.innerHTML='<div class=no-img>❌</div>'">`
          : '<div class="no-img">없음</div>'}
      </div>
      <div class="info">
        <div class="id">${id}</div>
        <div class="name">${name}</div>
        ${isLocal
          ? '<span class="local-badge">📁 로컬</span>'
          : '<span class="pexels-badge">🌐 Pexels</span>'}
      </div>
    </div>`;
  }

  html += `</div></div>`;
}

html += `</body></html>`;

const outPath = path.join(__dirname, '../public/image-review.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('✅ 생성 완료: public/image-review.html');
console.log('📌 브라우저에서 열기: http://localhost:5175/image-review.html');
