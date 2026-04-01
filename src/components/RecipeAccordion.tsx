import { useState } from 'react';
import { Menu } from '../types';

interface Props {
  menu: Menu;
}

function Badge({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-700 text-zinc-200 text-xs font-semibold">
      {icon} {label}
    </span>
  );
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
        <div className="px-4 py-3 bg-zinc-800/50 text-sm text-zinc-300 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function RecipeAccordion({ menu }: Props) {
  const diffColor =
    menu.difficulty === '쉬움' ? 'text-green-400' :
    menu.difficulty === '보통' ? 'text-yellow-400' : 
    menu.difficulty === '어려움' ? 'text-red-400' : 'text-zinc-400';

  return (
    <div className="mt-4 space-y-3">
      {/* 뱃지 */}
      <div className="flex flex-wrap gap-2">
        <Badge icon="⏱️" label={`${menu.cookingTime}분`} />
        <Badge icon="👥" label={`${menu.servings}인분`} />
        <span className={`flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-700 text-xs font-semibold ${diffColor}`}>
          🎯 {menu.difficulty}
        </span>
      </div>

      {/* 재료 아코디언 */}
      <Accordion title="🛒 재료 보기">
        {typeof menu.ingredients === 'string' ? (
          <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{menu.ingredients}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {menu.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-zinc-400">{ing.name}</span>
                <span className="text-zinc-200 font-medium">{ing.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </Accordion>

      {/* 레시피 아코디언 */}
      <Accordion title="👨‍🍳 레시피 보기">
        <ol className="space-y-2 list-none">
          {menu.recipe.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Accordion>
    </div>
  );
}
