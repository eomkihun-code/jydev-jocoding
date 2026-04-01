import { FoodRecipe } from '../types/recipe';

interface Props {
  recipe: FoodRecipe;
}

const ITEMS = [
  { icon: '🔥', label: '열량', field: 'INFO_ENG', unit: 'kcal' },
  { icon: '🌾', label: '탄수화물', field: 'INFO_CAR', unit: 'g' },
  { icon: '💪', label: '단백질', field: 'INFO_PRO', unit: 'g' },
  { icon: '🧈', label: '지방', field: 'INFO_FAT', unit: 'g' },
  { icon: '🧂', label: '나트륨', field: 'INFO_NA', unit: 'mg' },
] as const;

export default function NutritionBadge({ recipe }: Props) {
  const hasAny = ITEMS.some(item => {
    const val = (recipe as Record<string, string>)[item.field];
    return val && val.trim() !== '' && val !== '0';
  });

  if (!hasAny) return null;

  return (
    <div className="grid grid-cols-5 gap-1 mt-3">
      {ITEMS.map(({ icon, label, field, unit }) => {
        const raw = (recipe as Record<string, string>)[field] ?? '';
        const val = raw.trim();
        if (!val || val === '0') return null;
        const num = parseFloat(val);
        const display = isNaN(num) ? val : num % 1 === 0 ? String(num) : num.toFixed(1);
        return (
          <div key={field} className="flex flex-col items-center bg-zinc-700/60 rounded-xl py-2 px-1">
            <span className="text-base mb-0.5">{icon}</span>
            <span className="text-[10px] text-zinc-400">{label}</span>
            <span className="text-xs font-bold text-zinc-200 leading-tight">{display}</span>
            <span className="text-[9px] text-zinc-500">{unit}</span>
          </div>
        );
      })}
    </div>
  );
}
