import { cn } from '../../lib/utils';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  className?: string;
}

export function Input({ 
  placeholder, 
  value, 
  onChange, 
  onKeyPress, 
  disabled = false,
  className 
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      disabled={disabled}
      className={cn(
        'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    />
  );
}