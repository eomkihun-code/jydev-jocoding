const DEFAULT_EMOJI: Record<string, string> = {
  '한식': '🍚', '중식': '🥢', '일식': '🍱', '양식': '🍝', '분식': '🌭', '야식': '🍗',
  '반찬': '🥗', '국&찌개': '🍲', '밥': '🍚', '후식': '🍰', '일품': '🍛',
  '볶음': '🥘', '찜': '♨️', '구이': '🔥', '튀김': '🍤', '무침': '🥬',
  '국': '🍜', '찌개': '🫕',
};

function getEmoji(cat: string): string {
  return DEFAULT_EMOJI[cat] ?? '🍽️';
}

interface Props {
  selected: string | null;
  onChange: (cat: string | null) => void;
  categories: readonly string[];
}

export default function CategoryFilter({ selected, onChange, categories }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
      <button
        onClick={() => onChange(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
          ${selected === null
            ? 'bg-brand-500 border-brand-500 text-white'
            : 'border-zinc-600 text-zinc-400 hover:border-zinc-400'
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
              : 'border-zinc-600 text-zinc-400 hover:border-zinc-400'
            }`}
        >
          {getEmoji(cat)} {cat}
        </button>
      ))}
    </div>
  );
}
