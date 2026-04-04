import { FoodRecipe } from '../types/recipe';

interface Props {
  recipe: FoodRecipe;
}

const ITEMS = [
  { icon: 'local_fire_department', label: '열량',    field: 'INFO_ENG', unit: 'kcal', color: '#b91c1c', bg: '#fee2e2', textColor: '#450a0a' },
  { icon: 'grain',                 label: '탄수화물', field: 'INFO_CAR', unit: 'g',   color: '#92400e', bg: '#fef3c7', textColor: '#451a03' },
  { icon: 'fitness_center',        label: '단백질',  field: 'INFO_PRO', unit: 'g',   color: '#1e40af', bg: '#dbeafe', textColor: '#1e3a8a' },
  { icon: 'water_drop',            label: '지방',    field: 'INFO_FAT', unit: 'g',   color: '#166534', bg: '#dcfce7', textColor: '#14532d' },
  { icon: 'science',               label: '나트륨',  field: 'INFO_NA',  unit: 'mg',  color: '#6d28d9', bg: '#ede9fe', textColor: '#4c1d95' },
] as const;

export default function NutritionBadge({ recipe }: Props) {
  const hasAny = ITEMS.some(item => {
    const val = (recipe as Record<string, string>)[item.field];
    return val && val.trim() !== '' && val !== '0';
  });

  if (!hasAny) return null;

  return (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {ITEMS.map(({ icon, label, field, unit, color, bg, textColor }) => {
        const raw = (recipe as Record<string, string>)[field] ?? '';
        const val = raw.trim();
        if (!val || val === '0') return <div key={field} />;
        const num = parseFloat(val);
        const display = isNaN(num) ? val : num % 1 === 0 ? String(num) : num.toFixed(1);
        return (
          <div
            key={field}
            className="flex flex-col items-center rounded-2xl py-4 px-2 gap-1.5"
            style={{ backgroundColor: bg }}
          >
            {/* 아이콘 */}
            <span className="material-symbols-outlined text-2xl" style={{ color }}>{icon}</span>
            {/* 라벨 */}
            <span className="text-[13px] font-bold" style={{ color }}>{label}</span>
            {/* 값 (가장 크고 진하게) */}
            <span className="text-[20px] font-extrabold leading-tight" style={{ color: textColor }}>{display}</span>
            {/* 단위 */}
            <span className="text-xs font-semibold" style={{ color }}>{unit}</span>
          </div>
        );
      })}
    </div>
  );
}
