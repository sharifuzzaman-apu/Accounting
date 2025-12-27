'use client';

const variants = {
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-orange-100 text-orange-800',
  info: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  gray: 'bg-gray-100 text-gray-800',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2. 5 py-1',
  lg: 'text-base px-3 py-1.5',
};

export default function Badge({
  children,
  variant = 'gray',
  size = 'md',
  className = '',
}) {
  return (
    <span className={`badge ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
