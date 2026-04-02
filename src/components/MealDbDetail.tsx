import { useState } from 'react';
import { UnifiedRecipe } from '../types/recipe';
import RecipeSteps from './RecipeSteps';

interface Props {
  recipe: UnifiedRecipe;
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-colors"
      >
        <span>{title}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-zinc-800/50 text-sm text-zinc-300">
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
        <Accordion title="🛒 재료 보기">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {recipe.ingredientsText.split(', ').map((item, i) => (
              <li key={i} className="text-zinc-300 text-xs truncate">• {item}</li>
            ))}
          </ul>
        </Accordion>
      )}

      {/* 레시피 아코디언 */}
      {recipe.steps.length > 0 && (
        <Accordion title={`👨‍🍳 레시피 보기 (${recipe.steps.length}단계)`}>
          <RecipeSteps steps={recipe.steps} />
        </Accordion>
      )}

      {/* YouTube 버튼 */}
      {recipe.youtubeUrl && (
        <a
          href={recipe.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-600/30 text-red-400 text-sm font-semibold hover:bg-red-600/30 transition-colors"
        >
          ▶ YouTube에서 요리 영상 보기
        </a>
      )}
    </div>
  );
}
