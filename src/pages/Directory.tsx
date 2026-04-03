import { useState, useMemo } from 'react';
import { useFoodRecipe } from '../hooks/useFoodRecipe';
import CategoryFilter from '../components/CategoryFilter';
import SEOHead from '../components/SEOHead';
import { toHttps } from '../hooks/useFoodRecipe';

function SkeletonItem() {
  return (
    <div className="bg-zinc-800/50 rounded-2xl p-5 border border-zinc-700/50 animate-pulse">
      <div className="w-full h-32 bg-zinc-700 rounded-xl mb-4" />
      <div className="h-6 bg-zinc-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-zinc-700 rounded w-1/2" />
    </div>
  );
}

export default function Directory() {
  const { recipes, loading, error, categories } = useFoodRecipe();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRecipes = useMemo(() => {
    if (!selectedCategory) return recipes;
    return recipes.filter(r => r.RCP_PAT2 === selectedCategory);
  }, [recipes, selectedCategory]);

  return (
    <div className="w-full max-w-6xl px-4 py-8 mx-auto">
      <SEOHead
        title="전체 메뉴 목록 | 오늘 뭐 먹지?"
        description="한식·중식·일식·양식·분식 1,400여 가지 레시피를 직접 찾아보세요. 식약처 공식 레시피 데이터 기반의 음식 목록을 카테고리별로 탐색할 수 있습니다."
      />

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-4">전체 메뉴 카탈로그</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          식약처 DB 기반 <strong>{loading ? '...' : recipes.length.toLocaleString()}개</strong>의 요리 정보입니다.<br />
          카테고리를 선택하여 원하는 레시피를 찾아보세요.
        </p>
      </div>

      <div className="mb-8 flex justify-center sticky top-[72px] z-30 py-2 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-2xl w-full bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
          {loading ? (
             <div className="flex gap-2 overflow-hidden">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-8 w-16 bg-zinc-700 rounded-full animate-pulse flex-shrink-0" />)}
             </div>
          ) : (
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
              categories={categories}
            />
          )}
        </div>
      </div>

      {error ? (
        <div className="text-center py-20 bg-zinc-800/30 rounded-3xl border border-dashed border-zinc-700">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-zinc-400">데이터를 불러오는 중 문제가 발생했습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => <SkeletonItem key={i} />)
          ) : (
            filteredRecipes.map((recipe) => (
              <div key={recipe.RCP_SEQ} className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all hover:-translate-y-1">
                {/* 썸네일 */}
                <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                  {recipe.ATT_FILE_NO_MAIN ? (
                    <img
                      src={toHttps(recipe.ATT_FILE_NO_MAIN) || ''}
                      alt={recipe.RCP_NM}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600 font-bold">NO IMAGE</div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-black/50 backdrop-blur-md text-white border border-white/10">
                      {recipe.RCP_PAT2}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-100 line-clamp-1">{recipe.RCP_NM}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 h-8">
                    {recipe.RCP_PARTS_DTLS}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-400 font-medium">✨ {recipe.RCP_WAY2}</span>
                    <button 
                      onClick={() => {
                        // 상세 페이지가 따로 없으므로 홈으로 가서 해당 메뉴 추천받기? 
                        // 또는 나중에 다이얼로그 추가 가능
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-[10px] font-bold text-brand-500 hover:text-brand-400 transition-colors"
                    >
                      상세보기 →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!loading && !error && filteredRecipes.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          해당 카테고리의 레시피가 없습니다.
        </div>
      )}
    </div>
  );
}
