import { Category } from '../types';
import { categories } from '../data/menuData';

const EMOJI: Record<Category, string> = {
  '한식': '🍚',
  '중식': '🥢',
  '일식': '🍱',
  '양식': '🍝',
  '분식': '🌭',
  '야식': '🍗',
};

interface Props {
  selected: Category | null;
  onChange: (cat: Category | null) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
      {/* 전체 */}
      <button
        onClick={() => onChange(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
          ${selected === null
            ? 'bg-brand-500 border-brand-500 text-white'
            : 'border-zinc-600 text-zinc-400 dark:hover:border-zinc-400 hover:border-zinc-400'
          }`}
      >
        전체
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === selected ? null : cat)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
            ${selected === cat
              ? 'bg-brand-500 border-brand-500 text-white'
              : 'border-zinc-600 text-zinc-400 dark:hover:border-zinc-400 hover:border-zinc-400'
            }`}
        >
          {EMOJI[cat]} {cat}
        </button>
      ))}
    </div>
  );
}
