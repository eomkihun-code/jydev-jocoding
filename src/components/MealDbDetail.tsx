import { useState } from 'react';
import { UnifiedRecipe } from '../types/recipe';
import RecipeSteps from './RecipeSteps';

interface Props {
  recipe: UnifiedRecipe;
}

function Accordion({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center p-5 bg-primary-container/30 text-primary border border-primary/20 rounded-lg hover:bg-primary-container/50 transition-all group"
      >
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-xl opacity-70">{icon}</span>
          <span className="font-headline text-lg font-medium">{title}</span>
        </div>
        <span className={`material-symbols-outlined text-2xl font-light transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-primary-container/10 border border-primary/10 rounded-lg mt-1 text-sm text-on-surface dark:text-zinc-300">
          {children}
        </div>
      )}
    </div>
  );
}

export default function MealDbDetail({ recipe }: Props) {
  if (!recipe.detailLoaded) {
    return (
      <div className="mt-4 text-center text-zinc-500 text-sm py-4">
        <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        상세 정보 불러오는 중...
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {/* 재료 아코디언 */}
      {recipe.ingredientsText && (
        <Accordion title="재료 보기" icon="shopping_basket">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {recipe.ingredientsText.split(', ').map((item, i) => (
              <li key={i} className="text-zinc-300 text-xs truncate">• {item}</li>
            ))}
          </ul>
        </Accordion>
      )}

      {/* 레시피 아코디언 */}
      {recipe.steps.length > 0 && (
        <Accordion title={`레시피 보기 (${recipe.steps.length}단계)`} icon="restaurant">
          <RecipeSteps steps={recipe.steps} />
        </Accordion>
      )}

      {/* YouTube 버튼 */}
      {recipe.youtubeUrl && (
        <a
          href={recipe.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 p-5 border border-[#d64545]/30 text-[#d64545] rounded-lg hover:bg-[#d64545]/5 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">play_circle</span>
          <span className="font-headline font-medium">YouTube에서 요리 영상 보기</span>
        </a>
      )}
    </div>
  );
}
