import React from 'react';

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'super';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function TactileButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  children,
  ...props
}: TactileButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-2xl transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap shrink-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CB0F6] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0';

  const sizeClasses =
    size === 'lg'
      ? 'px-7 py-4 text-base min-h-[52px]'
      : 'px-5 py-3 text-sm min-h-[44px]';

  const variantClasses: Record<NonNullable<TactileButtonProps['variant']>, string> = {
    primary:
      'bg-[#58CC02] hover:bg-[#61E002] text-white border-2 border-[#58A700] border-b-[5px] active:border-b-2 active:translate-y-[3px] shadow-sm',
    secondary:
      'bg-[#1CB0F6] hover:bg-[#2BC0FF] text-white border-2 border-[#1899D6] border-b-[5px] active:border-b-2 active:translate-y-[3px] shadow-sm',
    outline:
      'bg-white hover:bg-[#F7F7F7] text-[#3C3C3C] border-2 border-[#E5E5E5] border-b-[5px] active:border-b-2 active:translate-y-[3px]',
    super:
      'bg-gradient-to-r from-[#1CB0F6] via-[#3F8CFF] to-[#CE82FF] hover:brightness-105 text-white border-2 border-[#1778D4] border-b-[5px] active:border-b-2 active:translate-y-[3px] shadow-sm',
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${sizeClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
