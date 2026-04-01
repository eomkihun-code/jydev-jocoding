import { Menu } from '../types';

export const menus: Menu[] = [
  // 한식
  { id: 'k1',  name: '김치찌개',  category: '한식', keyword: 'kimchi stew' },
  { id: 'k2',  name: '된장찌개',  category: '한식', keyword: 'korean soybean paste stew' },
  { id: 'k3',  name: '불고기',    category: '한식', keyword: 'bulgogi korean beef' },
  { id: 'k4',  name: '비빔밥',    category: '한식', keyword: 'bibimbap korean rice bowl' },
  { id: 'k5',  name: '삼겹살',    category: '한식', keyword: 'korean grilled pork belly' },
  { id: 'k6',  name: '갈비탕',    category: '한식', keyword: 'korean beef rib soup' },
  { id: 'k7',  name: '제육볶음',  category: '한식', keyword: 'spicy stir fried pork korean' },
  { id: 'k8',  name: '순두부찌개',category: '한식', keyword: 'sundubu soft tofu stew' },
  { id: 'k9',  name: '닭볶음탕',  category: '한식', keyword: 'braised spicy chicken korean' },
  { id: 'k10', name: '김밥',      category: '한식', keyword: 'kimbap korean rice roll' },
  // 중식
  { id: 'c1',  name: '짜장면',    category: '중식', keyword: 'jjajangmyeon black bean noodles' },
  { id: 'c2',  name: '짬뽕',      category: '중식', keyword: 'jjamppong spicy seafood noodle soup' },
  { id: 'c3',  name: '탕수육',    category: '중식', keyword: 'sweet sour pork chinese' },
  { id: 'c4',  name: '마파두부',  category: '중식', keyword: 'mapo tofu chinese' },
  { id: 'c5',  name: '볶음밥',    category: '중식', keyword: 'chinese fried rice' },
  { id: 'c6',  name: '양장피',    category: '중식', keyword: 'chinese cold noodle seafood' },
  // 일식
  { id: 'j1',  name: '초밥',      category: '일식', keyword: 'sushi japanese' },
  { id: 'j2',  name: '라멘',      category: '일식', keyword: 'ramen japanese noodle soup' },
  { id: 'j3',  name: '돈카츠',    category: '일식', keyword: 'tonkatsu japanese pork cutlet' },
  { id: 'j4',  name: '우동',      category: '일식', keyword: 'udon japanese noodle' },
  { id: 'j5',  name: '카레',      category: '일식', keyword: 'japanese curry rice' },
  { id: 'j6',  name: '오코노미야키', category: '일식', keyword: 'okonomiyaki japanese pancake' },
  // 양식
  { id: 'w1',  name: '파스타',    category: '양식', keyword: 'pasta italian' },
  { id: 'w2',  name: '피자',      category: '양식', keyword: 'pizza italian' },
  { id: 'w3',  name: '스테이크',  category: '양식', keyword: 'steak beef grilled' },
  { id: 'w4',  name: '리조또',    category: '양식', keyword: 'risotto italian' },
  { id: 'w5',  name: '햄버거',    category: '양식', keyword: 'hamburger burger' },
  { id: 'w6',  name: '샐러드',    category: '양식', keyword: 'fresh salad bowl' },
  // 분식
  { id: 'b1',  name: '떡볶이',    category: '분식', keyword: 'tteokbokki spicy rice cake' },
  { id: 'b2',  name: '순대',      category: '분식', keyword: 'sundae korean sausage' },
  { id: 'b3',  name: '튀김',      category: '분식', keyword: 'korean street food fritters' },
  { id: 'b4',  name: '라볶이',    category: '분식', keyword: 'rabokki ramen tteokbokki' },
  { id: 'b5',  name: '오므라이스',category: '분식', keyword: 'omurice omelette rice' },
  { id: 'b6',  name: '돈까스',    category: '분식', keyword: 'pork cutlet donkasu' },
  // 야식
  { id: 'n1',  name: '치킨',      category: '야식', keyword: 'korean fried chicken' },
  { id: 'n2',  name: '족발',      category: '야식', keyword: 'korean braised pork feet' },
  { id: 'n3',  name: '보쌈',      category: '야식', keyword: 'bossam korean boiled pork' },
  { id: 'n4',  name: '양꼬치',    category: '야식', keyword: 'lamb skewer chinese barbecue' },
  { id: 'n5',  name: '곱창',      category: '야식', keyword: 'korean grilled intestine gopchang' },
];

export const categories = ['한식', '중식', '일식', '양식', '분식', '야식'] as const;
