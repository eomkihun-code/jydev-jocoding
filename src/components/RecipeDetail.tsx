import { useState } from 'react';
import { FoodRecipe } from '../types/recipe';
import { parseIngredients } from '../utils/parseIngredients';
import { extractSteps } from '../hooks/useFoodRecipe';
import NutritionBadge from './NutritionBadge';
import RecipeSteps from './RecipeSteps';

interface Props {
  recipe: FoodRecipe;
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
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

export default function RecipeDetail({ recipe }: Props) {
  const steps = extractSteps(recipe);
  const sections = parseIngredients(recipe.RCP_PARTS_DTLS);

  return (
    <div className="mt-4 space-y-3">
      {/* 조리 방식 뱃지 */}
      {recipe.RCP_WAY2?.trim() && (
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-zinc-700 text-zinc-200 text-xs font-semibold">
            🍳 {recipe.RCP_WAY2}
          </span>
          {recipe.HASH_TAG?.trim() && recipe.HASH_TAG.split('#').filter(Boolean).map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-zinc-700/50 text-zinc-400 text-xs">
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* 영양정보 */}
      <NutritionBadge recipe={recipe} />

      {/* 저나트륨 팁 */}
      {recipe.RCP_NA_TIP?.trim() && (
        <div className="text-xs text-teal-400 bg-teal-900/20 border border-teal-800/40 rounded-xl px-3 py-2">
          💚 저나트륨 팁: {recipe.RCP_NA_TIP}
        </div>
      )}

      {/* 재료 아코디언 */}
      <Accordion title="🛒 재료 보기">
        {sections.length > 0 ? (
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <div key={i}>
                {sec.section !== '재료' && (
                  <p className="text-xs font-bold text-brand-400 mb-1">{sec.section}</p>
                )}
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {sec.items.map((item, j) => (
                    <li key={j} className="text-zinc-300 text-xs truncate">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">재료 정보가 없어요.</p>
        )}
      </Accordion>

      {/* 레시피 아코디언 */}
      <Accordion title={`👨‍🍳 레시피 보기 (${steps.length}단계)`}>
        <RecipeSteps steps={steps} />
      </Accordion>
    </div>
  );
}
