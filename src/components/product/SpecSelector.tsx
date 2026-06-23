import { Spec } from '@/data/mockData';

interface SpecSelectorProps {
  specs: Spec[];
  selected: Record<string, string>;
  onChange: (specName: string, value: string) => void;
}

export default function SpecSelector({ specs, selected, onChange }: SpecSelectorProps) {
  return (
    <div className="space-y-4">
      {specs.map((spec) => (
        <div key={spec.name}>
          <label className="text-sm font-medium text-text_primary mb-2 block">
            {spec.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {spec.options.map((option) => {
              const isSelected = selected[spec.name] === option;
              return (
                <button
                  key={option}
                  onClick={() => onChange(spec.name, option)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-gray-200 bg-white text-text_primary hover:border-primary/50'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
