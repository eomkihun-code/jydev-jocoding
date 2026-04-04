import { RecipeStep } from '../types/recipe';

interface Props {
  steps: RecipeStep[];
}

export default function RecipeSteps({ steps }: Props) {
  if (steps.length === 0) return <p className="text-on-surface-variant text-sm">조리 순서 정보가 없어요.</p>;

  return (
    <ol className="space-y-5">
      {steps.map(({ step, text, imgUrl }) => (
        <li key={step} className="flex gap-4">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm flex items-center justify-center font-bold mt-0.5">
            {step}
          </span>
          <div className="flex-1 space-y-3">
            <p className="text-[17px] text-on-background dark:text-zinc-100 leading-relaxed font-medium">{text}</p>
            {imgUrl && (
              <img
                src={imgUrl}
                alt={`조리 ${step}단계`}
                className="w-full max-h-52 object-cover rounded-xl border border-red-100"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                loading="lazy"
              />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
