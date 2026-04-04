import { FoodRecipe } from '../types/recipe';

interface Props {
  recipe: FoodRecipe;
}

const ITEMS = [
  { icon: 'local_fire_department', label: '열량', field: 'INFO_ENG', unit: 'kcal', color: '#dc2626', bg: '#fee2e2' },
  { icon: 'grass',                 label: '탄수화물', field: 'INFO_CAR', unit: 'g',  color: '#b45309', bg: '#fef3c7' },
  { icon: 'fitness_center',        label: '단백질', field: 'INFO_PRO', unit: 'g',   color: '#1d4ed8', bg: '#eff6ff' },
  { icon: 'water_drop',            label: '지방',   field: 'INFO_FAT', unit: 'g',   color: '#15803d', bg: '#f0fdf4' },
  { icon: 'science',               label: '나트륨', field: 'INFO_NA',  unit: 'mg',  color: '#7c3aed', bg: '#f5f3ff' },
] as const;

export default function NutritionBadge({ recipe }: Props) {
  const hasAny = ITEMS.some(item => {
    const val = (recipe as Record<string, string>)[item.field];
    return val && val.trim() !== '' && val !== '0';
  });

  if (!hasAny) return null;

  return (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {ITEMS.map(({ icon, label, field, unit, color, bg }) => {
        const raw = (recipe as Record<string, string>)[field] ?? '';
        const val = raw.trim();
        if (!val || val === '0') return <div key={field} />;
        const num = parseFloat(val);
        const display = isNaN(num) ? val : num % 1 === 0 ? String(num) : num.toFixed(1);
        return (
          <div
            key={field}
            className="flex flex-col items-center rounded-2xl py-3 px-2 gap-1"
            style={{ backgroundColor: bg }}
          >
            <span className="material-symbols-outlined text-xl" style={{ color }}>{icon}</span>
            <span className="text-[11px] font-semibold" style={{ color }}>{label}</span>
            <span className="text-sm font-bold text-on-background leading-tight">{display}</span>
            <span className="text-[10px] text-on-surface-variant">{unit}</span>
          </div>
        );
      })}
    </div>
  );
}
