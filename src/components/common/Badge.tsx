interface BadgeProps {
  text: string;
  variant?: 'primary' | 'gold' | 'success' | 'outline';
  className?: string;
}

export default function Badge({ text, variant = 'primary', className = '' }: BadgeProps) {
  const baseStyle =
    'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold';

  const variantStyles = {
    primary: 'bg-primary text-white',
    gold: 'bg-gold text-text_primary',
    success: 'bg-green-500 text-white',
    outline: 'border border-primary text-primary bg-transparent',
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      {text}
    </span>
  );
}
