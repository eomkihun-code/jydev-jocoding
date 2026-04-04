import { useState } from 'react';
import { FoodRecipe } from '../types/recipe';
import { parseIngredients } from '../utils/parseIngredients';
import { extractSteps } from '../hooks/useFoodRecipe';
import NutritionBadge from './NutritionBadge';
import RecipeSteps from './RecipeSteps';

interface Props {
  recipe: FoodRecipe;
}

function Accordion({ title, icon, children, defaultOpen = false }: {
  title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-red-100 rounded-2xl overflow-hidden dark:border-zinc-700">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-6 py-4 bg-white hover:bg-red-50 transition-colors cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-primary">{icon}</span>
          <span className="font-label text-lg font-bold text-on-background dark:text-zinc-100">{title}</span>
        </div>
        <span className={`material-symbols-outlined text-xl text-primary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-red-50/50 dark:bg-zinc-900 border-t border-red-100 dark:border-zinc-700">
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
          <span className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
            {recipe.RCP_WAY2}
          </span>
          {recipe.HASH_TAG?.trim() && recipe.HASH_TAG.split('#').filter(Boolean).map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-red-50 text-on-surface-variant border border-red-100 text-xs font-medium">
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* 영양정보 */}
      <NutritionBadge recipe={recipe} />

      {/* 저나트륨 팁 */}
      {recipe.RCP_NA_TIP?.trim() && (
        <div className="flex gap-3 items-start bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4">
          <span className="material-symbols-outlined text-emerald-600 text-xl flex-shrink-0 mt-0.5">eco</span>
          <p className="text-[16px] text-emerald-900 leading-relaxed font-semibold">
            <span className="font-bold">저나트륨 팁</span> · {recipe.RCP_NA_TIP}
          </p>
        </div>
      )}

      {/* 재료 아코디언 */}
      <Accordion title="재료 보기" icon="shopping_basket">
        {sections.length > 0 ? (
          <div className="space-y-4">
            {sections.map((sec, i) => (
              <div key={i}>
                {sec.section !== '재료' && (
                  <p className="text-xs font-bold text-primary mb-2">{sec.section}</p>
                )}
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {sec.items.map((item, j) => (
                    <li key={j} className="text-[16px] font-medium text-on-background dark:text-zinc-100 truncate flex items-start gap-1.5">
                      <span className="text-primary mt-1 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-on-surface-variant text-sm">재료 정보가 없어요.</p>
        )}
      </Accordion>

      {/* 레시피 아코디언 */}
      <Accordion title={`레시피 보기 (${steps.length}단계)`} icon="restaurant">
        <RecipeSteps steps={steps} />
      </Accordion>
    </div>
  );
}
