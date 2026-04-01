const recommendBtn = document.getElementById('recommendBtn');
const themeBtn = document.getElementById('themeBtn');
const result = document.getElementById('result');
const html = document.documentElement;

const menus = [
  { emoji: '🍖', name: '삼겹살', desc: '상추에 싸먹는 노릇노릇 삼겹살. 소주 한 잔이 생각나는 날', tag: '한식', tagClass: 'tag-korean' },
  { emoji: '🍜', name: '짜장면', desc: '달콤한 춘장 소스에 비벼먹는 중화요리의 정석', tag: '중식', tagClass: 'tag-chinese' },
  { emoji: '🍣', name: '초밥', desc: '신선한 재료로 만든 한 입 크기의 일본 정통 요리', tag: '일식', tagClass: 'tag-japanese' },
  { emoji: '🍕', name: '피자', desc: '바삭한 도우 위에 치즈가 넘치는 오늘의 선택', tag: '양식', tagClass: 'tag-western' },
  { emoji: '🍔', name: '버거', desc: '두툼한 패티와 신선한 채소의 완벽한 조합', tag: '패스트푸드', tagClass: 'tag-fast' },
  { emoji: '🥘', name: '부대찌개', desc: '햄, 소시지, 라면이 어우러진 얼큰하고 든든한 찌개', tag: '한식', tagClass: 'tag-korean' },
  { emoji: '🍱', name: '도시락', desc: '다양한 반찬이 가득한 알차고 균형 잡힌 한 끼', tag: '일식', tagClass: 'tag-japanese' },
  { emoji: '🌮', name: '타코', desc: '살사소스와 아보카도로 맛을 낸 멕시칸 스트리트 푸드', tag: '양식', tagClass: 'tag-western' },
  { emoji: '🍲', name: '김치찌개', desc: '잘 익은 김치와 돼지고기로 끓인 얼큰한 국민 찌개', tag: '한식', tagClass: 'tag-korean' },
  { emoji: '🍝', name: '파스타', desc: '알덴테 면과 진한 소스의 이탈리안 감성', tag: '양식', tagClass: 'tag-western' },
  { emoji: '🦆', name: '오리주물럭', desc: '매콤달콤한 양념에 볶아낸 오리고기 한 상', tag: '한식', tagClass: 'tag-korean' },
  { emoji: '🍛', name: '카레라이스', desc: '향긋한 향신료가 가득한 부드럽고 든든한 카레', tag: '양식', tagClass: 'tag-western' },
  { emoji: '🥟', name: '만두전골', desc: '육즙 가득한 만두가 들어간 뜨끈한 전골 한 냄비', tag: '한식', tagClass: 'tag-korean' },
  { emoji: '🍗', name: '치킨', desc: '바삭한 튀김옷과 촉촉한 속살, 역대급 저녁 메뉴', tag: '패스트푸드', tagClass: 'tag-fast' },
  { emoji: '🐟', name: '연어 덮밥', desc: '두툼한 연어 슬라이스와 밥의 완벽한 조화', tag: '일식', tagClass: 'tag-japanese' },
  { emoji: '🥩', name: '스테이크', desc: '미디엄 레어로 구운 육즙 가득한 오늘의 특식', tag: '양식', tagClass: 'tag-western' },
  { emoji: '🍜', name: '라멘', desc: '진한 육수와 쫄깃한 면발, 일본식 라면의 정수', tag: '일식', tagClass: 'tag-japanese' },
  { emoji: '🫕', name: '순두부찌개', desc: '보드라운 순두부에 해산물이 들어간 얼큰한 찌개', tag: '한식', tagClass: 'tag-korean' },
  { emoji: '🌯', name: '샤와르마', desc: '구운 고기와 채소를 랩에 싸먹는 중동식 길거리 음식', tag: '양식', tagClass: 'tag-western' },
  { emoji: '🍤', name: '새우튀김 정식', desc: '바삭하게 튀긴 새우와 밥, 미소국이 함께하는 정식', tag: '일식', tagClass: 'tag-japanese' },
];

// 테마 토글
themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? '🌙 다크모드' : '☀️ 라이트모드';
});

// 랜덤 메뉴 1개 선택
function pickMenu() {
  return menus[Math.floor(Math.random() * menus.length)];
}

// 결과 렌더링
function renderMenu(menu) {
  result.innerHTML = `
    <div class="menu-card">
      <div class="menu-emoji">${menu.emoji}</div>
      <div class="menu-info">
        <div class="menu-name">${menu.name}</div>
        <div class="menu-desc">${menu.desc}</div>
        <span class="menu-tag ${menu.tagClass}">${menu.tag}</span>
      </div>
    </div>
  `;
}

recommendBtn.addEventListener('click', () => {
  renderMenu(pickMenu());
});
