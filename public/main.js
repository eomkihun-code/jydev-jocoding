const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const themeBtn = document.getElementById('themeBtn');
const bonusCheck = document.getElementById('bonusCheck');
const gamesGrid = document.getElementById('gamesGrid');
const statusEl = document.getElementById('status');
const html = document.documentElement;

let lastGames = [];

// 테마 토글
themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? '🌙 다크모드' : '☀️ 화이트모드';
});

// 번호 색상 클래스
function ballClass(n) {
  if (n <= 10) return 'y';
  if (n <= 20) return 'b';
  if (n <= 30) return 'r';
  if (n <= 40) return 'g';
  return 'gr';
}

// 중복 없는 랜덤 숫자 뽑기
function pick(count, max) {
  const pool = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
}

// 공 HTML 생성
function ballHTML(n, isBonus = false) {
  return `<span class="ball ${ballClass(n)}${isBonus ? ' bonus' : ''}">${n}</span>`;
}

// 게임 카드 렌더링
function renderGames(games) {
  const withBonus = bonusCheck.checked;
  gamesGrid.innerHTML = games.map((nums, i) => {
    const main = nums.slice(0, 6);
    const bonus = nums[6];
    const balls = main.map(n => ballHTML(n)).join('');
    const bonusBall = withBonus && bonus ? ballHTML(bonus, true) : '';
    const isLastOdd = games.length % 2 === 1 && i === games.length - 1;
    return `
      <div class="game-card${isLastOdd ? ' full-width' : ''}">
        <div class="game-label">게임 ${i + 1}</div>
        <div class="balls">${balls}${bonusBall}</div>
      </div>`;
  }).join('');
}

// 추천 버튼
generateBtn.addEventListener('click', () => {
  const withBonus = bonusCheck.checked;
  lastGames = Array.from({ length: 5 }, () => pick(withBonus ? 7 : 6, 45));
  renderGames(lastGames);
  statusEl.textContent = '추천 완료! (5게임)';
});

// 보너스 체크박스 토글 시 재렌더링
bonusCheck.addEventListener('change', () => {
  if (lastGames.length > 0) {
    // 보너스 번호가 없으면 다시 생성
    if (bonusCheck.checked && lastGames[0].length < 7) {
      lastGames = lastGames.map(nums => {
        const extra = pick(7, 45).find(n => !nums.includes(n));
        return [...nums, extra];
      });
    }
    renderGames(lastGames);
  }
});

// 전체 복사
copyBtn.addEventListener('click', () => {
  if (lastGames.length === 0) {
    statusEl.textContent = '먼저 번호를 추천받으세요.';
    return;
  }
  const withBonus = bonusCheck.checked;
  const text = lastGames.map((nums, i) => {
    const main = nums.slice(0, 6).join(', ');
    const bonus = withBonus && nums[6] ? ` | 보너스: ${nums[6]}` : '';
    return `게임 ${i + 1}: ${main}${bonus}`;
  }).join('\n');

  navigator.clipboard.writeText(text).then(() => {
    statusEl.textContent = '클립보드에 복사됐어요!';
    setTimeout(() => { statusEl.textContent = '추천 완료! (5게임)'; }, 2000);
  });
});
