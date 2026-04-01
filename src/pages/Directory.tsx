import { useState } from 'react';
import { menus } from '../data/menuData';
import { Category } from '../types';
import CategoryFilter from '../components/CategoryFilter';
import SEOHead from '../components/SEOHead';

export default function Directory() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredMenus = selectedCategory 
    ? menus.filter(m => m.category === selectedCategory) 
    : menus;

  return (
    <div className="w-full max-w-4xl px-4 py-8 mx-auto">
      <SEOHead 
        title="전체 메뉴 모아보기" 
        description="오늘 뭐 먹지 서비스에서 제공하는 모든 저녁 메뉴와 레시피 목록을 한눈에 살펴보세요. 당신이 좋아하는 한식, 중식, 일식 등 다양한 카테고리별 요리를 검색할 수 있습니다."
      />

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4">전체 메뉴 카탈로그</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          우리가 준비한 <strong>{menus.length}여 가지</strong>의 맛있는 메뉴 데이터베이스입니다.<br />
          아래 필터를 클릭하여 원하는 카테고리의 메뉴를 확인해보세요!
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="max-w-2xl w-full bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenus.map((menu) => (
          <div key={menu.id} className="bg-white dark:bg-zinc-800 rounded-2xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-1 text-xs font-bold rounded-lg bg-zinc-100 dark:bg-zinc-700 text-brand-500">
                {menu.category}
              </span>
              <span className="px-2 py-1 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-700 rounded-full">
                ⏳ {menu.cookingTime}분
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">{menu.name}</h3>
            
            <div className="mb-4 space-y-1">
              <p className="text-sm font-medium text-zinc-500 line-clamp-2">
                <strong>🛒 재료:</strong> {menu.ingredients.join(', ')}
              </p>
            </div>
            
            <div className="text-sm bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">👨‍🍳 레시피 요약:</p>
              <ul className="list-disc list-inside text-zinc-500 dark:text-zinc-400 space-y-1 text-xs">
                {menu.recipe.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {filteredMenus.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          이 카테고리에는 등록된 메뉴가 없습니다.
        </div>
      )}
    </div>
  );
}
