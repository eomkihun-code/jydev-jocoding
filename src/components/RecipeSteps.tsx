import { RecipeStep } from '../types/recipe';

interface Props {
  steps: RecipeStep[];
}

export default function RecipeSteps({ steps }: Props) {
  if (steps.length === 0) return <p className="text-zinc-500 text-sm">조리 순서 정보가 없어요.</p>;

  return (
    <ol className="space-y-4">
      {steps.map(({ step, text, imgUrl }) => (
        <li key={step} className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
            {step}
          </span>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-zinc-300 leading-relaxed">{text}</p>
            {imgUrl && (
              <img
                src={imgUrl}
                alt={`조리 ${step}단계`}
                className="w-full max-h-44 object-cover rounded-xl"
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
